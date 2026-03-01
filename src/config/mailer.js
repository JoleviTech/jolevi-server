// import nodemailer from "nodemailer";

// const contactEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: '"Jolevi" <jolevi.tech@gmail.com>',
//     // from: "Jolevi",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     html: options.html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// async function sendContactEmail(name, email) {
//   try {
//     await contactEmail({
//       email: email,
//       subject: "Thank you for contacting Jolevi",
//       //   message: `Click this link to confirm your email: ${confirmationUrl}`,
//       html: `
//       <p>Hello there,</p>
//       <p>Thank you for reaching out to us at Jolevi. You are sure to hear from us within the next 2 working days.</p>
//       <p>Please know that we value and appreciate you.</p>
//       <p>Talk to you soon</p>
//       `,
//     });

//     // Return true to indicate that the email was successfully sent
//     return true;
//   } catch (error) {
//     console.error("Email sending error:", error);

//     // Return false to indicate that there was an error sending the email
//     return false;
//   }
// }

// export default sendContactEmail;

import { Resend } from "resend";

async function sendUserConfirmationEmail(name, email) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY); // ✅ inside function
    await resend.emails.send({
      from: "Jolevi <noreply@yourdomain.com>",
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
