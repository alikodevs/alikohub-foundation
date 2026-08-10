const nodemailer = require('nodemailer');

const isConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);

const createTransporter = () => {
  if (!isConfigured) {
    console.log('[Mailer] SMTP credentials not fully provided. Mailer operating in log/development mode.');
    return {
      sendMail: async (mailOptions) => {
        console.log('[Mailer] Simulated Email Dispatch to:', mailOptions.to);
        console.log('[Mailer] Subject:', mailOptions.subject);
        return { messageId: 'simulated-email-id' };
      },
    };
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

const transporter = createTransporter();

module.exports = transporter;
