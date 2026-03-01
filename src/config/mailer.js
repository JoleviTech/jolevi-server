import { Resend } from "resend";

async function sendUserConfirmationEmail(name, email) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY); // ✅ inside function
    await resend.emails.send({
      from: "Jolevi <noreply@jolevi.com>",
      reply_to: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Thank you for contacting Jolevi",
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us at Jolevi. You are sure to hear from us within the next 2 working days.</p>
        <p>Please know that we value and appreciate you.</p>
        <p>Talk to you soon</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("User email error:", error);
    return false;
  }
}

async function sendAdminNotificationEmail(name, email, message) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY); // ✅ inside function
    await resend.emails.send({
      from: "Jolevi <noreply@yourdomain.com>",
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: gray; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Admin email error:", error);
    return false;
  }
}

export { sendUserConfirmationEmail, sendAdminNotificationEmail };
