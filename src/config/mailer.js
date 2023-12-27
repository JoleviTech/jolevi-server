import nodemailer from "nodemailer";

const contactEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Jolevi" <jolevi.tech@gmail.com>',
    // from: "Jolevi",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

async function sendContactEmail(name, email) {
  try {
    await contactEmail({
      email: email,
      subject: "Thank you for contacting Jolevi",
      //   message: `Click this link to confirm your email: ${confirmationUrl}`,
      html: `
      <p>Hello there,</p>
      <p>Thank you for reaching out to us at Jolevi. You are sure to hear from us within the next 2 working days.</p>
      <p>Please know that we value and appreciate you.</p>
      <p>Talk to you soon</p>
      `,
    });

    // Return true to indicate that the email was successfully sent
    return true;
  } catch (error) {
    console.error("Email sending error:", error);

    // Return false to indicate that there was an error sending the email
    return false;
  }
}

export default sendContactEmail;
