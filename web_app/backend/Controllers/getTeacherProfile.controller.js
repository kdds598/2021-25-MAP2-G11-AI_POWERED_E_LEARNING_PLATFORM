import express from "express";
import mongoose from "mongoose";
import { Teacher } from "../Models/teacher.model.js";
// const router = express.Router();

// Controller to fetch a teacher's profile by ObjectId
export const getTeacherProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the given ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Find the teacher by ObjectId
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
