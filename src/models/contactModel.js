import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    validators: {
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      ],
    },
  },
  message: String,
  submittedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
