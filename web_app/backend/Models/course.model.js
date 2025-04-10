import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String }, // Cloudinary URL for course cover image
    description: { type: String },
    category: { type: String },
    tags: [String], // Additional tags for filtering (e.g., ["React", "MongoDB", "Node.js"])
    totalVideos: { type: Number, default: 0 }, // Total number of videos
    createdAt: { type: Date, default: Date.now },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);

