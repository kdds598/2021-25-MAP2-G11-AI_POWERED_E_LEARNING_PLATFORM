
import { useState, useEffect, useCallback } from "react";
import styles from "../Styles/Teachers.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userp from "../assets/user-profile.avif"
const TeacherSearch = () => {
  const [teachers, setTeachers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch teachers (all teachers)
  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/search/teachers");
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to search teachers based on query
  const searchTeachers = useCallback(async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/search/teachers?query=${searchQuery}`);
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Error searching teachers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle input change with debounce effect
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      fetchTeachers();
    } else {
      searchTeachers(value);
    }
  };

  // Fetch all teachers on mount
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for teachers..."
        value={query}
        onChange={handleSearch}
        className={styles.searchBar}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.teacherList}>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <div key={teacher._id} className={styles.teacherCard}>
                <img src={teacher.profilePicture||userp} alt={teacher.fullName} className={styles.teacherImage} />
                <div>
                  <h3 className={styles.teacherName}>{teacher.fullName}</h3>
                  <i className={styles.teacherBio}>{teacher.bio}</i>
                  <div style={{ marginTop: "10px" }}>
                    {(teacher.expertise || []).map((exp) => (
                      <p key={exp}>{exp}{" "}</p>
                    ))}
                  </div>
                  <button
                    className={styles.viewProfile}
                    onClick={() => navigate(`/teacher/${teacher._id}`, { state: { teacher } })}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherSearch;
