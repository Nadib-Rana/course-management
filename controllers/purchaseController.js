import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

// Purchase a Course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prevent duplicate purchase
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ message: "You already purchased this course" });
    }

    // Save purchase
    const purchase = await Purchase.create({
      userId,
      courseId,
      amount: course.price,
      date: new Date()
    });

    res.status(201).json({
      message: "Course purchased successfully",
      purchase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Purchased Courses
export const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchases = await Purchase.find({ userId })
      .populate("courseId", "title description price instructor");

    res.json({
      total: purchases.length,
      courses: purchases
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
