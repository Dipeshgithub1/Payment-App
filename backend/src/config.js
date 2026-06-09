require("dotenv").config({ override: true });

const MONGODB_URL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is not defined in .env");
}

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in .env");
}
if(!FRONTEND_URL){
  throw new Error("❌FRONTEND_URL  is not defined in .env")
}

module.exports = {
    MONGODB_URL,
    JWT_SECRET,
    FRONTEND_URL
};
