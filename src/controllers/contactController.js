import { BadUserRequestError, NotFoundError } from "../error/error.js";
import Contact from "../models/contactModel.js";
import { contactValidator } from "../validators/contactValidator.js";
import sendContactEmail from "../config/mailer.js";

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

      // Send contact email
      await sendContactEmail(newContact.name, newContact.email);

      res.status(201).json({
        message: "Form Submitted",
        status: "Success",
        data: {
          contact: newContact,
        },
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
  // userContactController: async (req, res) => {
  //   const { error } = contactValidator.validate(req.body);
  //   if (error) throw error;
  //   const { name, email, message } = req.body;
  //   // const emailExists = await Contact.find({ email });
  //   // if (emailExists.length > 0)
  //   //   throw new BadUserRequestError("User already exists");

  //   const newContact = await Contact.create({
  //     name: name,
  //     email: email,
  //     message: message,
  //     submittedAt: Date.now(),
  //   });

  //  await sendContactEmail(req, newContact.name, newContact.email);

  //   res.status(201).json({
  //     message: "A new user has filled the contact form",
  //     status: "Success",
  //     data: {
  //       contact: newContact,
  //     },
  //   });
  // },
};

export default contactController;
