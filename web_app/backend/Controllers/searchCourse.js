

import express from "express";
import { Course } from "../Models/Course.Model.js";

export const searchCourses = async (req, res) => {

  
  try {
    const { query } = req.query;
    if (!query) {
      // return res.status(400).json({ message: "Search query is required" });
      const courses = await Course.find({});
      return res.status(200).json({ courses });
      // res.status(200).json({ courses });

    }

    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "teachers", // Name of the Teacher collection in MongoDB
          localField: "teacher",
          foreignField: "_id",
          as: "teacherInfo",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { tags: { $elemMatch: { $regex: query, $options: "i" } } },
            { "teacherInfo.fullName": { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          tags: 1,
          totalVideos: 1,
          createdAt: 1,
          teacher: 1,
          videos: 1,
          thumbnail: 1,
          "teacherInfo.fullName": 1, // Include teacher's full name in response
        },
      },
    ]);

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const coursesByteacherid = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const courses = await Course.find({ teacher: teacherId });
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses by teacher ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}