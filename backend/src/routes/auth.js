const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  getMe,
  resetPasswordRequest,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Validation rules
const registerValidation = [
  body("fullName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const resetPasswordValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", auth, getMe);
router.post("/reset-password", resetPasswordValidation, resetPasswordRequest);

module.exports = router;
