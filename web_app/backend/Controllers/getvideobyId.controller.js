import { Video } from "../Models/Video.Model.js";
import mongoose from "mongoose";

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
      }
    const video = await Video.findById(id)
      

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ video });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
