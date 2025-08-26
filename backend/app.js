const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./Controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./Routes/userRoutes');
const campaignRouter = require('./Routes/campaignRoutes');
const donationRouter = require('./Routes/donationRoutes');


const app = express();

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});


app.use('/api/v1/users', userRouter);
app.use('/api/v1/campaigns', campaignRouter);
app.use('/api/v1/donations', donationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
