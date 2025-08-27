// Mock implementation without TensorFlow dependency

class FraudDetectionModel {
  constructor() {
    this.isTrained = true;
  }
  
  // Initialize and load model
  async init() {
    try {
      // Mock initialization
      console.log('Mock fraud detection model initialized');
    } catch (error) {
      console.error('Error initializing mock fraud detection model:', error);
    }
  }
  
  // Extract features from transaction data
  extractFeatures(transactionData) {
    const {
      amount,
      donationFrequency,
      timeSinceLastDonation,
      donorHistoryScore,
      recipientPatternScore
    } = transactionData;
    
    // Return normalized features as a simple array
    return {
      normalizedAmount: amount / 1000,
      normalizedFrequency: donationFrequency / 10,
      hoursSinceLastDonation: timeSinceLastDonation / 3600,
      donorHistoryScore,
      recipientPatternScore
    };
  }
  
  // Predict fraud probability
  async predict(transactionData) {
    try {
      const features = this.extractFeatures(transactionData);
      
      // Simple heuristic-based fraud detection
      // Higher amounts, unusual frequency, and low donor history score increase fraud probability
      const fraudProbability = (
        features.normalizedAmount * 0.3 + 
        (1 - features.donorHistoryScore) * 0.4 + 
        (1 - features.recipientPatternScore) * 0.3
      );
      
      // Clamp between 0 and 1
      const clampedScore = Math.max(0, Math.min(1, fraudProbability));
      
      return {
        fraudScore: clampedScore,
        isFraud: clampedScore > 0.7 // Threshold can be adjusted
      };
    } catch (error) {
      console.error('Error predicting fraud:', error);
      return { fraudScore: 0, isFraud: false };
    }
  }
  
  // Train model (for initial setup)
  async trainModel(trainingData) {
    try {
      // Mock training process
      console.log(`Mock training completed with ${trainingData.length} samples`);
    } catch (error) {
      console.error('Error in mock training:', error);
    }
  }
}

module.exports = new FraudDetectionModel();