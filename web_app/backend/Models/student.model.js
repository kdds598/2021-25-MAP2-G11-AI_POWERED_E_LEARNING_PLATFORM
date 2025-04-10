import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // Cloudinary URL
    },
  { timestamps: true }
);


export const Student = mongoose.model("Student", StudentSchema);


