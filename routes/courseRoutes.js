import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById
} from "../controllers/courseController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(authenticate, authorizeAdmin, createCourse) // Admin Power
  .get(getAllCourses);

router.route("/:id")
  .delete(authenticate, authorizeAdmin, deleteCourse) // Admin Power
  .get(getCourseById);

export default router;