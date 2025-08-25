const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION😒😒 shutting down');
  process.exit(1);
});

// Load environment variables before requiring app
dotenv.config({ path: './config.env' });

// Set up mongoose connection options to prevent model recompilation issues
mongoose.set('strictQuery', false);

const DB = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/charity_donations';

mongoose.connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

// Require app after database connection is established
const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION😒😒 shutting down');
  server.close(() => {
    process.exit(1);
  });
});

