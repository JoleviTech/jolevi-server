import { BadUserRequestError, NotFoundError } from "../error/error.js";
import Contact from "../models/contactModel.js";
import { contactValidator } from "../validators/contactValidator.js";
import sendContactEmail from "../config/mailer.js";

const contactController = {
  userContactController: async (req, res) => {
    const { error } = contactValidator.validate(req.body);
    if (error) throw error;
    const { name, email, message } = req.body;
    // const emailExists = await Contact.find({ email });
    // if (emailExists.length > 0)
    //   throw new BadUserRequestError("User already exists");

    const newContact = await Contact.create({
      name: name,
      email: email,
      message: message,
      submittedAt: submittedAt,
    });

    sendContactEmail(req, newContact.name, newContact.email);

    res.status(201).json({
      message: "A new user has filled the contact form",
      status: "Success",
      data: {
        contact: newContact,
      },
    });
  },
};

export default contactController;
