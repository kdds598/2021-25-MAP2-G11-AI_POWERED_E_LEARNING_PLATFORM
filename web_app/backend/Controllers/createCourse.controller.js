import { Course } from "../Models/Course.Model.js";
import {Teacher} from "../Models/teacher.model.js";
import { Video } from "../Models/Video.Model.js";

export const createCourse = async (req, res) => {
  try {
  
    let { title, description, category, tags, uid } = req.body;

    if (!title || !uid || !category || !tags || !description) {
        
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof tags === "string") {
      tags = JSON.parse(tags); // Convert JSON string back to an array
  }
 
  
  
    // Validate Teacher
    const teacher = await Teacher.findOne({ uid: uid });

if (!teacher) {
  return res.status(404).json({ message: "Teacher not found" });
}

    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create Course
    const newCourse = new Course({
      title,
      description,
      category,
      tags,
      teacher: teacher._id,
      thumbnail: req.thumbnailUrl, // URL from Cloudinary
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Course Creation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// Add Video to Course
export const addVideoToCourse = async (req, res) => {
  
  try {
    const { courseId } = req.params;
    const { title, description ,
      uid
    } = req.body; // Video details

    // Ensure video URL is available (set by middleware)
    if (!req.videoUrl) {
      return res.status(400).json({ message: "Video upload failed" });
    }

    const teacher = await Teacher.findOne({ uid: uid });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Ensure only the teacher who created the course can add videos
    if (course.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to add video" });
    }

    // Create new Video document
    const newVideo = new Video({
      teacher: teacher._id,
      course: courseId,
      videoUrl: req.videoUrl,
      thumbnail: req.thumbnailUrl || "",
      title,
      description,
      
    });

    // Save video and update course
    await newVideo.save();
    course.videos.push(newVideo._id);
    course.totalVideos += 1;
    await course.save();

    res.status(201).json({
      message: "Video added successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { uid } = req.body;

    // Find the teacher
    const teacher = await Teacher.findOne({ uid: uid });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }




    // Ensure only the teacher who created the course can delete it
    if (course.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete course" });
    }

    

    // logger.info("Deleting course:", course.title);

    // Delete all videos associated with the course from Cloudinary and database
    for (const videoId of course.videos) {
      const video = await Video.findById(videoId);
      if (video) {
        if (video.videoUrl) {
          const videoPublicId = video.videoUrl.split("/").pop().split(".")[0];
          await cloudinary.v2.uploader.destroy(videoPublicId, { resource_type: "video" });
        }
        if (video.thumbnail) {
          const thumbnailPublicId = video.thumbnail.split("/").pop().split(".")[0];
          await cloudinary.v2.uploader.destroy(thumbnailPublicId);
        }
        await Video.findByIdAndDelete(videoId);
      }
    }

    // Delete the course from database
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




