import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Styles/course.module.css";
import userp from "../assets/user-profile.avif";

const CourseDetail = () => {
  const location = useLocation();
  const {tid,  cid } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(location.state?.course || null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
  
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/id/${cid}`);
        const data = await res.json();
        setCourse(data.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
  
    const fetchVideos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/courseid/${cid}`);
        const data = await res.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching course videos:", error);
      }
    };
  
    const fetchData = async () => {
      await fetchCourse();
      await fetchVideos();
      setisLoading(false); // Ensure this runs **after** both functions complete
    };
  
    fetchData();
  
  }, [tid, cid]);
  

  

  if (isLoading) return <p
  style={{textAlign: "center", marginTop: "200px",color: "blue"}}
  >Loading...</p>;
  else if (!course) return <p className={styles.error}>No course data found!</p>;

  return (
    <div className={styles.container}>
      {/* Course Information */}
      <div className={styles.courseInfo}>
        <img 
        className={styles.coursecover}
        src={course.thumbnail} alt="courve cover" />
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>
        <p><strong>Category:</strong> {course.category}</p>
        {/* <p><strong>Tags:</strong> {course.tags?.join(", ") || "No tags available"}</p> */}

        {
           <p>
           {course.tags?.length ? (
             course.tags.map((tag, index) => (
               <span className={styles.courseexp} key={index} style={{ marginRight: "10px" }}>
                 {tag}
               </span>
             ))
           ) : (
             "No tags"
           )}
         </p>
        }
      </div>

      {/* Instructor Details */}
      <div className={styles.instructor}
       style={{cursor:"pointer"}}
       onClick={()=>navigate(`/teacher/${course.teacher._id}`)}
      >
        <h2>Instructor</h2>
        <div className={styles.teacherInfo}>
          <img 
            src={
                // course.teacher?.profilePicture || 
                userp} 
            alt={course.teacher?.fullName} 
            className={styles.profilePic} 
          />
          <div>
            <h3>{course.teacher?.fullName}</h3>
            {
            // console.log(course)
            
            }
            <p><strong>Expertise:</strong> {course.teacher?.expertise?.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Course Videos */}
      <div className={styles.videos}>
        <h2>Course Videos</h2>
        {videos?.length > 0 ? (
          videos.map((video, index) => (
            <div key={video._id} className={styles.videoCard}
            style={{cursor:"pointer"}}
            onClick={()=>navigate(`/video/${cid}/${video._id}`)}
            >
              <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
              <div className={styles.videoDetails}>
                <h3 className={styles.videoTitle}>Lecture {index + 1}: {video.title}</h3>
                <p className={styles.videoDescription}>{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;



