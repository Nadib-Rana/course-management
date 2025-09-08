import express from "express";
import { purchaseCourse, getPurchasedCourses } from "../controllers/purchaseController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Purchase a course
router.post("/", authenticate, purchaseCourse);

// View purchased courses
router.get("/", authenticate, getPurchasedCourses);

export default router;
