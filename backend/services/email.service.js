const fs = require('fs');
const path = require('path');
const transporter = require('../config/mailer');

/**
 * Send thank-you / welcome email to a newsletter subscriber.
 * @param {string} email
 * @param {object} [options]
 * @param {string} [options.name]
 */
async function sendWelcomeEmail(email, options = {}) {
  try {
    const templatePath = path.join(__dirname, '../templates/welcome-email.html');
    let htmlContent = '';

    const baseUrl = process.env.APP_URL || process.env.CORS_ORIGIN || 'http://localhost:8080';
    const websiteUrl = String(baseUrl).split(',')[0].trim().replace(/\/$/, '');
    const unsubscribeUrl = `${websiteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
    const currentYear = new Date().getFullYear().toString();
    const recipientName = options.name ? String(options.name).trim() : 'Friend';

    if (fs.existsSync(templatePath)) {
      htmlContent = fs.readFileSync(templatePath, 'utf8');
      htmlContent = htmlContent
        .replace(/{{name}}/g, recipientName)
        .replace(/{{websiteUrl}}/g, websiteUrl)
        .replace(/{{unsubscribeUrl}}/g, unsubscribeUrl)
        .replace(/{{year}}/g, currentYear);
    } else {
      htmlContent = `
        <h2>Thank you for subscribing</h2>
        <p>Hi ${recipientName},</p>
        <p>Thank you for subscribing to the AlikoHub Foundation newsletter.</p>
        <p>We will share updates about our programs, stories, and ways to get involved.</p>
        <p><a href="${websiteUrl}">Visit our website</a></p>
        <p>With appreciation,<br>The AlikoHub Foundation Team</p>
      `;
    }

    const textContent = [
      `Hi ${recipientName},`,
      '',
      'Thank you for subscribing to the AlikoHub Foundation newsletter.',
      'We are glad to have you with us.',
      '',
      'You will receive updates about our programs, stories, and ways to get involved.',
      '',
      `Visit us: ${websiteUrl}`,
      `Unsubscribe: ${unsubscribeUrl}`,
      '',
      'With appreciation,',
      'The AlikoHub Foundation Team',
    ].join('\n');

    const fromAddress =
      process.env.EMAIL_FROM ||
      process.env.MAIL_FROM ||
      'AlikoHub Foundation <noreply@alikohub.org>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: 'Thank you for subscribing to AlikoHub Foundation',
      text: textContent,
      html: htmlContent,
    });

    console.log(
      `[EmailService] Thank-you email sent to ${email} (MessageId: ${info.messageId || 'ok'})`
    );
    return true;
  } catch (err) {
    console.error(`[EmailService] Failed to send thank-you email to ${email}:`, err.message);
    return false;
  }
}

module.exports = {
  sendWelcomeEmail,
};
