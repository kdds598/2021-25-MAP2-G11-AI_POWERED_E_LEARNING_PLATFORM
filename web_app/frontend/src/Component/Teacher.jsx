import { useLocation, useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Styles/teacher.module.css";
import userp from "../assets/user-profile.avif";
const TeacherDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tid } = useParams();

  const [teacher, setTeacher] = useState(location.state?.teacher || null);
  const [isLoading, setisLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
        setisLoading(true);

    const fetchTeacher = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/teachers/id/${tid}`);
        const data = await res.json();
        setTeacher(data.teacher);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/teacher/${tid}/courses`);
        const data = await res.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };


  const fetchData = async () => {
    try {
      if (!teacher) {
        await fetchTeacher(); // Waits for teacher data before proceeding
      }
      await fetchCourses(); // Ensures this runs after teacher data is fetched
    } finally {
      setisLoading(false); // Runs after everything is completed
    }
  };

  fetchData();


  }, [tid]); 

  
  if (isLoading) return <p
  style={{textAlign: "center", marginTop: "200px",color: "blue"}}
  >Loading...</p>
  else if (!teacher) return <p className={styles.error}>No teacher data found!</p>;

  return (
    <div className={styles.container}>
      <div className={styles.teacherInfo}>
        <img 
         src={
            teacher.profilePicture?teacher.profilePicture:
            userp} 
        alt={teacher.fullName} className={styles.profilePic} />
        <h1 className={styles.name}>{teacher.fullName}</h1>
        <p className={styles.bio}>{teacher.bio}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Contact:</strong> {teacher.contact}</p>
        <p><strong>Expertise:</strong> {teacher.expertise.join(", ")}</p>
        {teacher.linkedIn && (
          <a href={teacher.linkedIn} className={styles.linkedIn} target="_blank" rel="noopener noreferrer">
            View LinkedIn Profile
          </a>
        )}
      </div>

      <div className={styles.education}>
        <h2>Education</h2>
        {teacher.education.map((edu, index) => (
          <div key={index} className={styles.eduCard}>
            <p><strong>Degree:</strong> {edu.degree} in {edu.specialization}</p>
            <p><strong>Institute:</strong> {edu.institute}</p>
            <p><strong>Year:</strong> {edu.yearOfCompletion}</p>
          </div>
        ))}
      </div>

      <div className={styles.courses}>
        <h2>Courses by {teacher.fullName}</h2>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div 
            onClick={()=>{navigate(`/course/${course._id}`)}}
            key={course._id} className={styles.courseCard}>
              <img
              className={styles.coursecover}
              src={course.thumbnail} alt="thumbnail" />
              <div>
              <h3>{course.title}</h3>
              <p className={styles.courseDesc}>{course.description}</p>

              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDetail;












