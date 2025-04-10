import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  specialization: { type: String, required: true },
  institute: { type: String, required: true },
  yearOfCompletion: { type: Number, required: true },
},{ _id: false });




const teacherSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  expertise: { type: [String], required: true }, // Array of expertise/subjects
  education: {
    type: [educationSchema],
    required: true,
    validate: [
      (val) => val.length > 0, "At least one education entry is required.",
      (val) => val.length <= 3, "You can add up to 3 education entries only."
    ],
  },
  linkedIn: { type: String, default: "" },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  // certificates: { type: [String], default: [] }, // Array of file URLs
});

export const Teacher = mongoose.model("Teacher", teacherSchema);





const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Certificate name
  issuingOrganization: { type: String, required: true }, // Who issued it
  issueDate: { type: Date, required: true }, // Date of issue
  expiryDate: { type: Date }, // If applicable
  certificateId: { type: String }, // Unique ID if available
  certificateURL: { type: String }, // Online verification link
  certificateFile: { type: String }, // Cloud storage URL for uploaded file
});







