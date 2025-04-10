import multer from "multer";

// Multer Storage Configuration
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {

    cb(null, "./public/temp"); // Temporary storage before Cloudinary upload
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file names
  },
});

// File filter to check file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/") || file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video and image files are allowed."), false);
  }
};

// Multer Upload
export const upload = multer({
  storage,
  fileFilter,
});











