import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById
} from "../controllers/courseController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin Routes
router.post("/", authenticate, authorizeAdmin, createCourse);
router.delete("/:id", authenticate, authorizeAdmin, deleteCourse);

// Public Routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

export default router;
