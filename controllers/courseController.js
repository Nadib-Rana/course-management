import Course from "../models/Course.js";

// Admin: Create Course
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, instructor } = req.body;
    if (!title || !description || !price || !instructor) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const newCourse = await Course.create({ title, description, price, instructor });
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    next(error);
  }
};


// Admin: Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users: Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users: Get Single Course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
