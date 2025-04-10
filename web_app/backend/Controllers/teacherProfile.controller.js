
import { Teacher } from "../Models/teacher.model.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js"; // Import Cloudinary upload function
import cloudinary from "cloudinary";

const isValidLinkedIn = (url) => {
  const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_/]+$/;
  return linkedInRegex.test(url);
};

export const updateTeacherProfile = async (req, res) => {
  try {
 

    const { uid } = req.params;
    const { contact, expertise, education, linkedIn, bio } = req.body;

    // Find the teacher
    let teacher = await Teacher.findById(uid);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Validate LinkedIn URL
    if (linkedIn && !isValidLinkedIn(linkedIn)) {
      return res.status(400).json({ message: "Invalid LinkedIn profile URL" });
    }

    // Update fields if provided
    if (contact) teacher.contact = contact;
    if (expertise) teacher.expertise = expertise; 
    if (education) teacher.education = education; 
    if (bio) teacher.bio = bio;
    if (linkedIn) teacher.linkedIn = linkedIn;

    // Handle profile picture update
    if (req.file) { 
      if (teacher.profilePicture) {
        // Extract public_id from Cloudinary URL
        const oldPublicId = teacher.profilePicture.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(`profile_pictures/${oldPublicId}`);
      }

      // Upload new profile picture to Cloudinary
      const uploadedImage = await uploadOnCloudinary(req.file.path, "image");
      if (!uploadedImage) {
        return res.status(500).json({ message: "Profile picture upload failed" });
      }
      
      teacher.profilePicture = uploadedImage.secure_url; // Save new Cloudinary URL
    }

    // Save updated teacher details
    await teacher.save();

    res.status(200).json({ message: "Profile updated successfully", teacher });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
