import { Course } from "../Models/Course.Model.js";
import mongoose from "mongoose";


export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
   if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: "Invalid  ID" });
       }

    // Fetch course and populate the teacher's details
    const course = await Course.findById(id).populate("teacher", "fullName email profilePicture expertise");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
