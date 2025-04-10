import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    videoUrl: { type: String, required: true }, // Cloudinary URL of the video
    thumbnail: { type: String }, // Cloudinary URL of video thumbnail
    duration: { type: Number }, // Video length in seconds
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", VideoSchema);


