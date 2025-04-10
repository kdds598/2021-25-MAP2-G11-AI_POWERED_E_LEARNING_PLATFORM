
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "../Styles/Courses.module.css";
import { useNavigate } from "react-router-dom";

const CourseSearch = () => {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = useCallback(async (searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:5000/api/search/courses${searchQuery ? `?query=${searchQuery}` : ""}`
      );
      setCourses(response.data.courses || []);
    } catch (error) {
      setError("Failed to fetch courses. Please try again.");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced effect for searching
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCourses(query.trim());
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query, fetchCourses]);

  // Initial fetch on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className={styles.container}>
      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        className={styles.searchBar}
      />

      {/* Loading or Error Message */}
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Course List */}
      {!loading && !error && (
        <div className={styles.courseList}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className={styles.courseCard}>
                {/* Course Thumbnail */}
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className={styles.thumbnail} />
                ) : (
                  <div className={styles.thumbnail} style={{ backgroundColor: "#eee" }}>
                    No Image
                  </div>
                )}

                {/* Course Details */}
                <div className={styles.courseDetails}>
                  <h1 className={styles.courseTitle}>{course.title || "Untitled Course"}</h1>
                  <p className={styles.description}>{course.description || "No description"}</p>
                  <p className={styles.courseCategory}>
                    Category: {course.category || "No category"}
                  </p>
                  <p>
                    {course.tags?.length ? (
                      course.tags.map((tag, index) => (
                        <span className={styles.courseTags} key={index} style={{ marginRight: "10px" }}>
                          {tag}
                        </span>
                      ))
                    ) : (
                      "No tags"
                    )}
                  </p>
                 
                  <button
                  style={{marginTop:"20px"}}
                    onClick={() => navigate(`/course/${course._id}`, { state: { course } })}
                    className={styles.viewcoursebutton}
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSearch;
