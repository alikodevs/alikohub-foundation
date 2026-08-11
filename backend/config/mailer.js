const nodemailer = require('nodemailer');

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
const isConfigured = Boolean(process.env.SMTP_HOST && smtpUser && smtpPass);

const createTransporter = () => {
  if (!isConfigured) {
    console.log(
      '[Mailer] SMTP not fully configured (need SMTP_HOST, SMTP_USER, and SMTP_PASS or SMTP_PASSWORD). Using log mode.'
    );
    return {
      sendMail: async (mailOptions) => {
        console.log('[Mailer] Simulated email to:', mailOptions.to);
        console.log('[Mailer] Subject:', mailOptions.subject);
        return { messageId: 'simulated-email-id' };
      },
    };
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure =
    process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465';

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      // Some networks/providers use intermediate certs Node rejects by default
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  });
};

const transporter = createTransporter();

module.exports = transporter;
module.exports.isMailConfigured = isConfigured;
