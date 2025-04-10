import express from "express";
import { uploadVideo } from "../Controllers/video.controller.js";
import { upload } from "../Middlewares/multer.middleware.js"; // Import your multer middleware
import { registerStudent, registerTeacher } from "../Controllers/EmailLogin.Controller.js";
import { EmailLoginsendOTP, EmailLoginverifyOTP } from "../Controllers/EmailLogin.Controller.js";
import { verifyToken } from "../Middlewares/verifyToken.middleware.js";
import { uploadCourseVideo, uploadThumbnailMiddleware } from "../Middlewares/cloudinary.middleware.js";
import { createCourse ,addVideoToCourse} from "../Controllers/createCourse.controller.js";
import { deleteVideoFromCourse } from "../Controllers/video.controller.js";
import { deleteCourse } from "../Controllers/createCourse.controller.js";
import { updateTeacherProfile } from "../Controllers/teacherProfile.controller.js";
import { searchTeachers } from "../Controllers/searchTeachers.controller.js";
import { coursesByteacherid, searchCourses } from "../Controllers/searchCourse.js";
import { getTeacherProfileById } from "../Controllers/getTeacherProfile.controller.js";
import { getCourseById } from "../Controllers/getCourese.controller.js";
import { getVideosByCourseId } from "../Controllers/getvideosbyCourseid.controller.js";
import { getVideoById } from "../Controllers/getvideobyId.controller.js";
import { updateCourse } from "../Controllers/editCourse.controller.js";
import { createUser } from "../Controllers/googleLogin.Controller.js";
import { uploadProfilePictureMiddleware } from "../Middlewares/cloudinary.middleware.js";
import { getUserByUid } from "../Controllers/getUserbyTypebyUID.js";
const router = express.Router();

// Route for uploading video

// router.post("/upload", upload.single("video"), uploadVideo);


router.post("/protected", 
  verifyToken,
  registerTeacher);

router.post("/courses/create",
  verifyToken
  , uploadThumbnailMiddleware, upload.single('thumbnail'),createCourse);


router.post("/send-otp",EmailLoginsendOTP);
router.post("/verify-otp",EmailLoginverifyOTP);
router.post("/register-student"
  ,verifyToken,
  registerStudent);

//adding video to course

router.post(
  "/courses/:courseId/add-video",
  // verifyToken,
  
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  
  uploadCourseVideo,
  addVideoToCourse
);

//deleteing video from the course
router.delete("/course/:courseId/video/:videoId", deleteVideoFromCourse);





// router.post("/courses/create",verifyToken, upload.fields([
//   { name: "video", maxCount: 1 },
//   { name: "thumbnail", maxCount: 1 },
// ]),
// uploadThumbnailMiddleware,createCourse
// );

router.post(
  "/course/create",
  // verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
  ]), // Multer for temp storage
  uploadThumbnailMiddleware, // Cloudinary upload + local file deletion
  createCourse // Final course creation
);


//deleting course
router.delete("/course/:courseId", deleteCourse);

//edit teachers profile
// router.put("/teacher/:uid", updateTeacherProfile);
// router.put("/teacher/:uid", upload.fields([{ name: "profilePicture", maxCount: 1 }]), updateTeacherProfile);
router.put(
  "/teacher/:uid",
  upload.single("profilePicture"),
//  uploadProfilePictureMiddleware,
    updateTeacherProfile
);

//seacrh teacher
router.get("/search/teachers", searchTeachers);

// courses byy teacher id
router.get("/teacher/:teacherId/courses", coursesByteacherid);

//search courses
router.get("/search/courses", searchCourses);

// get teacher by id
router.get("/teachers/id/:id", getTeacherProfileById);

// get course by id
router.get("/courses/id/:id", getCourseById);

// get videos by course id
router.get("/videos/courseid/:id", getVideosByCourseId);
// get video by id
router.get("/videos/id/:id", getVideoById);

//edit course details
router.put("/courses/:courseId", 
  upload.fields([
  { name: "thumbnail", maxCount: 1 },
])
, updateCourse);


router.post(
    "/upload",
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    uploadVideo
  );


  router.get("/get-user-by-UID",verifyToken,getUserByUid)
  router.post("/student-google-signup", verifyToken, createUser);
  router.post("/student-email-register", verifyToken, registerStudent);
  

export default router;
