// Mock training script without TensorFlow dependency
const fraudDetectionModel = require('./fraudDetection');

// Sample training data (in a real scenario, this would come from a database or file)
const generateTrainingData = () => {
  const data = [];
  
  // Normal transactions
  for (let i = 0; i < 800; i++) {
    data.push({
      amount: Math.random() * 10, // 0-10 ETH
      donationFrequency: Math.floor(Math.random() * 10), // 0-10 donations
      timeSinceLastDonation: Math.random() * 168, // 0-168 hours (1 week)
      donorHistoryScore: 0.7 + Math.random() * 0.3, // 0.7-1.0
      recipientPatternScore: 0.7 + Math.random() * 0.3, // 0.7-1.0
      isFraud: false
    });
  }
  
  // Fraudulent transactions
  for (let i = 0; i < 200; i++) {
    data.push({
      amount: 5 + Math.random() * 95, // 5-100 ETH (unusually high)
      donationFrequency: Math.floor(Math.random() * 20) + 10, // 10-30 donations (unusually frequent)
      timeSinceLastDonation: Math.random() * 2, // 0-2 hours (very recent)
      donorHistoryScore: Math.random() * 0.5, // 0-0.5 (low history score)
      recipientPatternScore: Math.random() * 0.5, // 0-0.5 (low pattern score)
      isFraud: true
    });
  }
  
  // Shuffle the data
  return data.sort(() => Math.random() - 0.5);
};

// Train the model
const trainModel = async () => {
  try {
    console.log('Generating training data...');
    const trainingData = generateTrainingData();
    
    console.log('Training fraud detection model...');
    await fraudDetectionModel.trainModel(trainingData);
    
    console.log('Model training completed successfully!');
    
    // Test the model with a sample
    const testData = {
      amount: 75, // High amount
      donationFrequency: 15, // High frequency
      timeSinceLastDonation: 1, // Very recent
      donorHistoryScore: 0.3, // Low score
      recipientPatternScore: 0.2 // Low score
    };
    
    const prediction = await fraudDetectionModel.predict(testData);
    console.log('Test prediction:', prediction);
    
  } catch (error) {
    console.error('Error training model:', error);
  }
};

// Run if this script is executed directly
if (require.main === module) {
  trainModel();
}

module.exports = trainModel;