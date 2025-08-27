const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // Send email notification
  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
  
  // Send donation confirmation email
  async sendDonationConfirmation(donorEmail, donationDetails) {
    const subject = 'Donation Confirmation';
    const html = `
      <h2>Thank you for your donation!</h2>
      <p>Your donation has been successfully processed.</p>
      <h3>Donation Details:</h3>
      <ul>
        <li>Amount: ${donationDetails.amount} ETH</li>
        <li>Charity: ${donationDetails.charityName}</li>
        <li>Transaction Hash: ${donationDetails.transactionHash}</li>
        <li>Date: ${new Date(donationDetails.createdAt).toLocaleString()}</li>
      </ul>
      <p>You can track your donation on the blockchain using the transaction hash provided.</p>
      <p>Thank you for your generosity!</p>
    `;
    
    return await this.sendEmail(donorEmail, subject, html);
  }
  
  // Send fraud alert email
  async sendFraudAlert(donorEmail, donationDetails) {
    const subject = 'Suspicious Transaction Alert';
    const html = `
      <h2>Suspicious Transaction Detected</h2>
      <p>We detected a potentially fraudulent transaction associated with your account.</p>
      <h3>Transaction Details:</h3>
      <ul>
        <li>Amount: ${donationDetails.amount} ETH</li>
        <li>Charity: ${donationDetails.charityName}</li>
        <li>Date: ${new Date(donationDetails.createdAt).toLocaleString()}</li>
        <li>Fraud Score: ${(donationDetails.fraudScore * 100).toFixed(2)}%</li>
      </ul>
      <p>If this was not you, please contact our support team immediately.</p>
      <p>If this was a legitimate transaction, you may need to verify your identity.</p>
    `;
    
    return await this.sendEmail(donorEmail, subject, html);
  }
  
  // Send charity verification email
  async sendCharityVerification(charityEmail, charityName, verified) {
    const status = verified ? 'approved' : 'rejected';
    const subject = `Charity Verification ${status}`;
    const html = `
      <h2>Charity Verification Status</h2>
      <p>Your charity "${charityName}" has been ${status}.</p>
      ${verified ? 
        '<p>Your charity is now verified and can receive donations through our platform.</p>' :
        '<p>If you believe this is an error, please contact our support team for more information.</p>'
      }
    `;
    
    return await this.sendEmail(charityEmail, subject, html);
  }
}

module.exports = new NotificationService();