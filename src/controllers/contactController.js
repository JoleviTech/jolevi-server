// import { BadUserRequestError, NotFoundError } from "../error/error.js";
// import Contact from "../models/contactModel.js";
// import { contactValidator } from "../validators/contactValidator.js";
// import sendContactEmail from "../config/mailer.js";

// const contactController = {
//   userContactController: async (req, res) => {
//     try {
//       const { error } = contactValidator.validate(req.body);
//       if (error) throw error;
//       const { name, email, message } = req.body;

//       const newContact = await Contact.create({
//         name,
//         email,
//         message,
//         submittedAt: Date.now(),
//       });

//       // Send contact email
//       // await sendContactEmail(newContact.name, newContact.email);
//       sendContactEmail(newContact.name, newContact.email).catch(err => 
//   console.error("Background email error:", err)
// );


//       res.status(201).json({
//         message: "Form submitted",
//         status: "Success",
//         data: {
//           contact: newContact,
//         },
//       });
//     } catch (error) {
//       console.error("Error handling contact form:", error);
//       res.status(500).json({
//         message: "Internal Server Error",
//         status: "Error",
//         error: error.message,
//       });
//     }
//   },
 
// };

// export default contactController;

import Contact from "../models/contactModel.js";
import { contactValidator } from "../validators/contactValidator.js";
import { sendUserConfirmationEmail, sendAdminNotificationEmail } from "../config/mailer.js";

const contactController = {
  userContactController: async (req, res) => {
    try {
      const { error } = contactValidator.validate(req.body);
      if (error) throw error;

      const { name, email, message } = req.body;

      const newContact = await Contact.create({
        name,
        email,
        message,
        submittedAt: Date.now(),
      });

      // Fire both emails in background - don't await so response is instant
      Promise.all([
        sendUserConfirmationEmail(newContact.name, newContact.email),
        sendAdminNotificationEmail(newContact.name, newContact.email, newContact.message),
      ]).catch((err) => console.error("Email background error:", err));

      res.status(201).json({
        message: "Form submitted successfully",
        status: "Success",
        data: { contact: newContact },
      });
    } catch (error) {
      console.error("Error handling contact form:", error);
      res.status(500).json({
        message: "Internal Server Error",
        status: "Error",
        error: error.message,
      });
    }
  },
};

export default contactController;
