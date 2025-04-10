import mongoose from "mongoose";
import { Video } from "../Models/Video.Model.js";
export const getVideosByCourseId = async (req, res) => {
  try {
    const { id } = req.params;

    
      if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid course ID" });
          }
          

    // Find all videos linked to the given courseId
    const videos = await Video.find(
        { course: id }
    ).populate("teacher", "fullName profilePicture");
    

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this course" });
    }

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
