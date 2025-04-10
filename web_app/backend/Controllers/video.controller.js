import { uploadOnCloudinary } from "../Utils/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    if (!req.files) return res.status(400).json({ message: "No files uploaded" });

    const videoFile = req.files.video ? req.files.video[0].path : null;
    const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0].path : null;

    let videoUpload, thumbnailUpload;

    if (videoFile) {
      videoUpload = await uploadOnCloudinary(videoFile, "video");
      if (!videoUpload) return res.status(500).json({ message: "Cloudinary video upload failed" });
    }

    if (thumbnailFile) {
      thumbnailUpload = await uploadOnCloudinary(thumbnailFile, "image");
      if (!thumbnailUpload) return res.status(500).json({ message: "Cloudinary thumbnail upload failed" });
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      videoUrl: videoUpload?.secure_url || null,
      thumbnailUrl: thumbnailUpload?.secure_url || null,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



import cloudinary from "cloudinary";
import { Video } from "../Models/Video.Model.js";
import { Course } from "../Models/Course.Model.js";
import { Teacher } from "../Models/teacher.model.js";



export const deleteVideoFromCourse = async (req, res) => {
  try {
    const { videoId, courseId } = req.params;
    const { uid } = req.body;
      

    const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
    

    

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete video from Cloudinary
    if (video.videoUrl) {
      const videoPublicId = video.videoUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public ID
      await cloudinary.v2.uploader.destroy(videoPublicId, { resource_type: "video" });
    }

    // Delete thumbnail from Cloudinary
    if (video.thumbnail) {
      const thumbnailPublicId = video.thumbnail.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(thumbnailPublicId);
    }

    // Remove video from course
    if (course) {
      course.videos = course.videos.filter(v => v.toString() !== videoId);
      course.totalVideos = Math.max(course.totalVideos - 1, 0);
      await course.save();
    }

    // Delete video from database
    await Video.findByIdAndDelete(videoId);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




























// import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// export const uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload video to Cloudinary
//     const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

//     if (!cloudinaryResponse) {
//       return res.status(500).json({ message: "Cloudinary upload failed" });
//     }

//     return res.status(201).json({
//       message: "Video uploaded successfully",
//       videoUrl: cloudinaryResponse.secure_url,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };
