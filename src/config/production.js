import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const production = {
  MONGODB_CONNECTION_URL: process.env.PRODUCTION_MONGODB_CONNECTION_URL,
  bcrypt_salt_round: process.env.PRODUCTION_BCRYPT_SALT_ROUND,
  jwt_secret_key: process.env.PRODUCTION_JWT_SECRET,
  PORT: process.env.PORT,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};

export default production;
