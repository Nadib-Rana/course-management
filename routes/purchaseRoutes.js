import express from "express";
import { purchaseCourse, getPurchasedCourses } from "../controllers/purchaseController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Purchase a course
router.route("/")
    .post(authenticate, purchaseCourse)
    .get(authenticate, getPurchasedCourses);

export default router;