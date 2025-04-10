import { uploadOnCloudinary } from "../Utils/cloudinary.js";

export const uploadThumbnailMiddleware = async (req, res,next) => {
  try {
    if (!req.files){ return res.status(400).json({ message: "No files uploaded" });
}
    const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0].path : null;

    let  thumbnailUpload;


    if (thumbnailFile) {
      thumbnailUpload = await uploadOnCloudinary(thumbnailFile, "image");
      if (!thumbnailUpload) return res.status(500).json({ message: "Cloudinary thumbnail upload failed" });
    }

    req.thumbnailUrl = thumbnailUpload?.secure_url || null;
    next();

    
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const uploadCourseVideo = async (req, res,next) => {
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

    req.videoUrl = videoUpload?.secure_url || null;
    req.thumbnailUrl = thumbnailUpload?.secure_url || null;
    next();
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







// profile pic


export const uploadProfilePictureMiddleware = async (req, res, next) => {
  try {
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ message: "No profile picture uploaded" });
    }

    const profilePictureFile = req.files.profilePicture[0].path;

    // Upload to Cloudinary
    const profilePictureUpload = await uploadOnCloudinary(profilePictureFile, "image");

    if (!profilePictureUpload) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    req.profilePictureUrl = profilePictureUpload.secure_url; // Store Cloudinary URL
    next();
  } catch (error) {
    console.error("Profile Picture Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};