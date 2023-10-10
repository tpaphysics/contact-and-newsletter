import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = ({ email, action }) => {
  return jwt.sign({ email, action }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION || "24h",
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email, action } = decoded;
    return { email, action };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error(`Token verification failed, ${error.message}`);
  }
};

export default { generateToken, verifyToken };
