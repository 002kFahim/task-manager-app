const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getRandomTask,
  getTaskStats,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// Validation rules
const taskValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Task title must be between 1 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Task description cannot exceed 500 characters"),
  body("category")
    .isIn(["Work", "Personal", "Health", "Learning", "Entertainment", "Other"])
    .withMessage("Invalid category"),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),
  body("dueDate").optional().isISO8601().withMessage("Invalid due date format"),
];

const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Task title must be between 1 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Task description cannot exceed 500 characters"),
  body("category")
    .optional()
    .isIn(["Work", "Personal", "Health", "Learning", "Entertainment", "Other"])
    .withMessage("Invalid category"),
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),
  body("dueDate").optional().isISO8601().withMessage("Invalid due date format"),
];

// Apply auth middleware to all routes
router.use(auth);

// Routes
router.get("/stats", getTaskStats);
router.get("/random", getRandomTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", taskValidation, createTask);
router.put("/:id", updateTaskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
