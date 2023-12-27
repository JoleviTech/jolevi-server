import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import globalErrorHandler from "./src/utils/globalErrorHandler.js";
import contactRouter from "./src/routes/contactRoute.js";
import config from "./src/config/index.js";

dotenv.config({ path: "./config.env" });

const mongoURI = config.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongoURI)
  .then(console.log("Database connection is established"))
  .catch((err) => console.log(err.message));
const port = config.PORT;
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", contactRouter);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:7000"],
    // credentials: true,
    // optionsSuccessStatus: 200,
  })
);

// error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
