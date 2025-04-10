import TeacherSignup from "./Component/TeacherSignup";
import TeacherSignin from "./Component/TeacherSignin";
import StudentSignup from "./Component/StudentSignup";
import StudentSignin from "./Component/StudentSignin";

import CourseSearch from "./Component/Courses";
import TeacherSearch from "./Component/teachers";
import TeacherDetail from "./Component/Teacher";
import CourseDetail from "./Component/Course";
import TeacherProfile from "./Component/TeacherProfile";
import EditCourse from "./Component/EditCourse";
import VideoPlayer from "./Component/VideoComponent";
import Navbar from "./Component/Navbar";




import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import UserProfile from "./Component/UserProfile";
import SigninComponent from "./Component/SigninComponent";
import { useAuth } from "./Context/Context";
import Home from "./Component/Home";
import Chatbot from "./Component/Chatbot";
import Quiz from "./Component/Quiz";


// Layout Component with Navbar
const Layout = () => (
  <>
    <Navbar />
  </>
);

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            // <h1>HOME</h1>
            <Home/>
            } />
          <Route path="/auth/teacher/signup" element={<TeacherSignup />} />  
          <Route path="/auth/teacher/signin" element={<TeacherSignin />} />
          <Route path="/auth/student/signup" element={<StudentSignup />} />
          <Route path="/auth/student/signin" element={<StudentSignin />} />
          <Route path="/teacher/:tid" element={<TeacherDetail />} />
          <Route path="/teachers" element={<TeacherSearch />} />
          <Route path="/courses" element={<CourseSearch />} />
          <Route path="/auth" element={<SigninComponent />} />
          <Route path="/course/:cid" element={<CourseDetail />} />
        
          <Route path="/profile" element={<UserProfile />}/>
          <Route path="/teacher/profile/:tid" element={<TeacherProfile />} />
          <Route path="/teacher/profile/course/edit/:courseId" element={<EditCourse />} /> 
          <Route path="/chat" element={<Chatbot />} /> 
          <Route path="/quiz" element={<Quiz />} /> 
          
          <Route path="/video/:courseId/:videoId" element={<VideoPlayer />} />
          <Route path="*" element={<h1 style={{justifySelf:"center",alignSelf:"center"}}>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
