import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { sendError, sendSuccess } from "./helper.js";

//Multer configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userProfile = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "users");
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const incomeProof = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "..", "uploads", "proof");
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadUserProfile = multer({ storage: userProfile });
export const uploadIncomeProof = multer({ storage: incomeProof });

export const deleteUploadedFile = async (file) => {
  if (file) {
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const AuthenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Access token missing"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token has expired"
      });
    }

    return res.status(401).json({
      status: false,
      message: "Invalid token"
    });
  }
};

