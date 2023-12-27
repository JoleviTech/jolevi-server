import express from "express";
import contactController from "../controllers/contactController.js";
import tryCatchHandler from "../utils/tryCatchHandler.js";

const contactRouter = express.Router();

contactRouter.post(
  "/contact",
  tryCatchHandler(contactController.userContactController)
);

export default contactRouter;
