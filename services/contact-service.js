const nodemailer = require('nodemailer');
const contactRepository = require('../repositories/contact-repository');
const { toCleanString, isEmail, parsePositiveInteger } = require('../utils/validation');

function validateContactMessage(body) {
  const errors = [];
  const fullName = toCleanString(body.fullName, 150);
  const email = toCleanString(body.email, 150).toLowerCase();
  const subject = toCleanString(body.subject, 200);
  const message = toCleanString(body.message, 4000);

  if (!fullName) errors.push('Full name is required.');
  if (!email || !isEmail(email)) errors.push('A valid email address is required.');
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');

  return { errors, message: { fullName, email, subject, message, messageType: 'anonymous' } };
}

function smtpConfigured() {
  return process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS;
}

async function sendContactEmail(message) {
  if (!smtpConfigured()) {
    return { sent: false, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    replyTo: message.email,
    subject: `FunctionSid contact: ${message.subject}`,
    text: `Name: ${message.fullName}\nEmail: ${message.email}\n\n${message.message}`
  });

  return { sent: true, skipped: false };
}

async function submitContactMessage(body) {
  const validation = validateContactMessage(body);
  if (validation.errors.length) {
    const error = new Error(validation.errors.join(' '));
    error.validationErrors = validation.errors;
    throw error;
  }

  const id = await contactRepository.createMessage(validation.message);
  let emailResult = { sent: false, skipped: true };

  try {
    emailResult = await sendContactEmail(validation.message);
  } catch (error) {
    emailResult = { sent: false, skipped: false, error: error.message };
  }

  return { id, email: emailResult };
}

async function listMessages(query = {}) {
  const page = parsePositiveInteger(query.page, 1);
  const pageSize = Math.min(parsePositiveInteger(query.pageSize, 10), 50);
  const result = await contactRepository.listMessages({
    search: toCleanString(query.search, 150),
    status: query.status && query.status !== 'all' ? query.status : undefined,
    page,
    pageSize
  });

  return {
    items: result.items,
    pagination: {
      page,
      pageSize,
      total: result.total,
      totalPages: Math.max(1, Math.ceil(result.total / pageSize))
    },
    query
  };
}

module.exports = { submitContactMessage, listMessages, validateContactMessage, sendContactEmail };
