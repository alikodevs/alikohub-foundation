const fs = require('fs');
const path = require('path');
const transporter = require('../config/mailer');

/**
 * Send welcome email to new/reactivated subscriber.
 * @param {string} email
 * @param {object} [options]
 * @param {string} [options.name]
 */
async function sendWelcomeEmail(email, options = {}) {
  try {
    const templatePath = path.join(__dirname, '../templates/welcome-email.html');
    let htmlContent = '';

    const baseUrl = process.env.APP_URL || 'http://localhost:8080';
    const websiteUrl = baseUrl.replace(/\/$/, '');
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
        <h2>Thank You for Joining Us</h2>
        <p>We’re excited to welcome you to the AlikoHub Foundation community.</p>
        <p>By subscribing, you’ll stay connected with our work, programs, and the impact we’re creating through opportunities that empower young people and strengthen communities.</p>
        <p>Together, we can continue building a future driven by knowledge, innovation, and positive change.</p>
        <p><a href="${websiteUrl}">Explore Our Impact</a></p>
        <p>With appreciation,<br>The AlikoHub Foundation Team</p>
      `;
    }

    const fromAddress = process.env.EMAIL_FROM || 'AlikoHub Foundation <noreply@alikohub.org>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: 'Welcome to the AlikoHub Foundation Community',
      html: htmlContent,
    });

    console.log(`[EmailService] Welcome email dispatched to ${email} (MessageId: ${info.messageId || 'ok'})`);
    return true;
  } catch (err) {
    console.error(`[EmailService] Failed to send welcome email to ${email}:`, err.message);
    return false;
  }
}

module.exports = {
  sendWelcomeEmail,
};
