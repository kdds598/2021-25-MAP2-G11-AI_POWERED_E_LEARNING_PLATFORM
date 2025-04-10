import { Course } from "../Models/Course.Model.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const updateCourse = async (req, res) => {
  try {
    
    const { courseId } = req.params;
    const { title, teacher,description,category,tags } = req.body;
    // const newThumbnail = req.file?.path; // New thumbnail file (if uploaded)
    const newThumbnail = req.files?.thumbnail?.[0]?.path; // Get thumbnail path if uploaded

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if(category){
      course.category = category
    }
    if(tags){
      course.tags = tags
    }
    if(description){
      course.description = description
    }

  

    // Handle thumbnail update
    if (newThumbnail) {
      // Delete previous thumbnail from Cloudinary if exists
      if (course.thumbnail) {
        const oldPublicId = course.thumbnail.split("/").pop().split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(oldPublicId);
      }

      // Upload new thumbnail to Cloudinary
      const uploadResponse = await uploadOnCloudinary(newThumbnail, "image");
      
      if (!uploadResponse) {
        return res.status(500).json({ message: "Failed to upload new thumbnail" });
      }
      course.thumbnail = uploadResponse.secure_url; // Update with new URL
    }

    // Save updated course
    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
