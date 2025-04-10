/* main */
import React, { useState, useEffect, useRef } from "react";
import styles from "../Styles/TeacherProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Trash } from "lucide-react";
const TeacherProfile = () => {

  const [delCourseLoading,setdelCourseLoading]= useState(null);
  const deleteCourse = async (courseId) => {
    setdelCourseLoading(courseId);
    try {

      const res = await fetch(`http://localhost:5000/api/course/${courseId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: teacher?.uid }),
      });
      const data = await res.json();
      if (res.ok) {
        setCourses(courses.filter((course) => course._id !== courseId));
      } else {
        console.error("Failed to delete course:", data.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }finally{
      setdelCourseLoading(null);
    }
  };

  ////

  const navigate = useNavigate();
  const { tid } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    contact: "",
    bio: "",
    expertise: [],
    education: [],
    profilePicture: "",
  });

  useEffect(() => {
    fetchTeacher();
    fetchCourses();
  }, [tid]);

  const fetchTeacher = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/teachers/id/${tid}`);
      if (!res.ok) throw new Error("Failed to fetch teacher data");
      const data = await res.json();
      setTeacher(data.teacher);
      setFormData({
        contact: data.teacher.contact || "",
        bio: data.teacher.bio || "",
        expertise: data.teacher.expertise || [],
        education: data.teacher.education || [],
        profilePicture: data.teacher.profilePicture || "",
      });
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/teacher/${tid}/courses`
      );
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [saveLoading,setsaveLoading]=useState(false)
  const handleSave = async () => {
    setsaveLoading(true)
    if(formData.contact.length!==10){
      alert("Invalid contact number");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/teacher/${tid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      fetchTeacher();
      setEditing(false);
    } catch (error) {
      console.error("Error updating teacher profile:", error);
    }
    finally{
      setsaveLoading(false)
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("profilePicture", file);


    try {
      const res = await fetch(`http://localhost:5000/api/teacher/${tid}`, {
        method: "PUT",

        body: data, // Pass FormData directly
      });
      

      if (!res.ok) throw new Error("Failed to upload profile picture");

      const result = await res.json();

   

      setFormData((prev) => ({
        ...prev,
        profilePicture: result.teacher.profilePicture, // Ensure API returns updated URL
      }));

      setTeacher((prev) => ({
        ...prev,
        profilePicture: result.teacher.profilePicture, // Ensure teacher state also updates
      }));
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };
const [newExpertise,setnewExpertise]=useState("")
  
const addExpertise = () => {
    if (newExpertise) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise],
      });
    }
    setnewExpertise("")
  };

  const removeExpertise = (index) => {
    const updatedExpertise = [...formData.expertise];
    updatedExpertise.splice(index, 1);
    setFormData({ ...formData, expertise: updatedExpertise });
  };

  const addEducation = () => {
    if (formData.education.length >= 3) {
      alert("You can only add up to 3 education entries.");
      return;
    }
    const newEducation = {
      degree: degree.current.value,
      specialization: specialization.current.value,
      institute: institute.current.value,
      yearOfCompletion: year.current.value,
    };
    if (newEducation.degree && newEducation.institute) {
      setFormData({
        ...formData,
        education: [...formData.education, newEducation],
      });
    }
    degree.current.value="";
    year.current.value="";
    institute.current.value="";
    specialization.current.value="";
    setaddedu(false)
  };

  const removeEducation = (index) => {
    if (formData.education.length <= 1) {
      alert("At least one education entry is required.");
      return;
    }
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  //add course
  const [addcourse, setaddcourse] = useState(false);
  const [formData1, setFormData1] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
  });
  const [currtag, setcurrtag] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange2 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleChangetags = (e) => {
    e.preventDefault();

    const value = e.target.value;
    setcurrtag(value);
  };

  const addtag = (e) => {
    e.preventDefault();
    if (currtag && !formData1.tags.includes(currtag)) {

      setFormData1((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, currtag],
      }));
      setcurrtag("");
    }
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData1.title ||
      !formData1.description ||
      !formData1.category ||
      !formData1.tags ||
      !thumbnail
    ) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("title", formData1.title);
      form.append("description", formData1.description);
      form.append("category", formData1.category);
      form.append("tags", JSON.stringify(formData1.tags));
      form.append("uid", teacher.uid);
      form.append("thumbnail", thumbnail);
    

      const response = await axios.post(
        "http://localhost:5000/api/course/create",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCourses((prevCourses) => [...prevCourses, response.data.course]);

      setMessage(response.data.message);
      setFormData1({ title: "", description: "", category: "", tags: [] });
      setThumbnail(null);
    } catch (error) {

      setMessage(error.response?.data?.message || "Error creating course.");
    } finally {
      setLoading(false);
    }
  };

  ///
  const [addedu,setaddedu]=useState(false)

  const degree = useRef("");
  const year = useRef("");
  const specialization = useRef("");
  const institute = useRef("");

  

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img
          src={formData.profilePicture || "https://via.placeholder.com/100"}
          alt="Teacher"
          className={styles.profilePic}
        />
       

        {editing ? (
          <>

        {      <input type="file"
                accept="image/*"
                onChange={handleProfilePictureChange} />
      }
            <label>Phone:</label>
            <input
              type="number"
              name="contact"
              className={styles.Einput}
              value={formData.contact}
              onChange={handleChange}
            />

            <label>Bio:</label>
            <textarea name="bio"
             className={styles.Etextarea}

            value={formData.bio} onChange={handleChange} />

            <label>Expertise:</label>
            <ul
          className={styles.Eul}

            >
              {formData.expertise.map((exp, index) => (
                <li 
                className={styles.Eli}

                key={index}>
                  {exp}{" "}
                  <button 
                  className={styles.Edelbutton}

                  onClick={() => removeExpertise(index)}><Trash size={15}/></button>
                </li>
              ))}
            </ul>

              <input
                type="text"
                name="contact"
                className={styles.Einput}
                value={newExpertise}
                style={{marginRight:"10px"}}
                onChange={(e)=>setnewExpertise(e.target.value)}
              />

            <button 
            className={styles.EAddexpbutton}

            onClick={addExpertise}>+ Add Expertise</button>

            <label>Education:</label>
            <ul
          className={styles.Eul}

            >
              {formData.education.map((edu, index) => (
                <li key={index}
                className={styles.Eli}
                >
                  {edu.degree} in {edu.specialization} from {edu.institute} (
                  {edu.yearOfCompletion})
                  <button
                  className={styles.Edelbutton}

                  onClick={() => removeEducation(index)}>Remove</button>
                </li>
              ))}
            </ul>
          
            <button 
          className={styles.EAddexpbutton}
              style={{background:(addedu?"red":"#007bff")}}
            onClick={()=>setaddedu((p)=>!p)}>{addedu?"close":"+ Add Education"}</button>

            {
              addedu && (<div 
              className={styles.addedu}
              >
                <div>
                  <label style={{justifySelf:"start",margin:"2%"}}>Degree:</label>
                <input
                style={{
                  width:"96%"
                }}
                type="text"
                name="contact"
                className={styles.Einput}
                ref={degree}
              />
              <label style={{justifySelf:"start",margin:"2%"}}>Specialization:</label>

              <input
              style={{
                width:"96%"
              }}
                type="text"
                name="contact"
                className={styles.Einput}
             
                ref={specialization}
/>
<label style={{justifySelf:"start",margin:"2%"}}>institute:</label>

<input
style={{
  width:"96%"
}}
                type="text"
                name="contact"
              
                ref={institute}
                className={styles.Einput}
              
                onChange={(e)=>setnewExpertise(e.target.value)}
              />
                                <label
                                style={{justifySelf:"start",margin:"2%"}}>Year:</label>


              <input

              style={{
                width:"96%"
              }}
                type="number"
                name="contact"
                min={2000}
                max={2050}
                ref={year}
                className={styles.Einput}
            
                onChange={(e)=>setnewExpertise(e.target.value)}
              />
            
              </div>
              
         <button 
          className={styles.EAddexpbutton}
              style={{marginBottom:"20px"}}
            onClick={addEducation}> Add Education</button>                      </div>
          )



            }

            <button 
            style={{marginLeft:"6px",padding:"8px 8px",borderRadius:"6px",border:"none",background:"green",color:"white"}}
            onClick={handleSave}>{saveLoading?"saving...":"Save"}</button>
          </>
        ) : (
          <>
            <h2>{teacher?.fullName}</h2>
            <p 
          className={styles.Ep}

            >
              <strong>Email:</strong> {teacher?.email}
            </p >
            <p          className={styles.Ep}
            >
              <strong>Phone:</strong> {teacher?.contact}
            </p>
            <p          className={styles.Ep}
            >
              <strong>Bio:</strong> {teacher?.bio}
            </p>

            <h3           className={styles.Eh3}
            >Expertise</h3>
            <ul           className={styles.Eul}
            >
              {teacher?.expertise?.map((exp, index) => (
                <li 
                className={styles.Eli}

                key={index}>{exp}</li>
              ))}
            </ul>

            <h3           className={styles.Eh3}
            >Education</h3>
            <ul           className={styles.Eul}
            >
              {teacher?.education?.map((edu, index) => (
                <li 
                className={styles.Eli}

                key={index}>
                  {edu.degree} in {edu.specialization} from {edu.institute} (
                  {edu.yearOfCompletion})
                </li>
              ))}
            </ul>

            <button 
                            className={styles.Ebutton}

            onClick={() => setEditing(true)}>Edit</button>
          </>
        )}
      </div>

        {
          //course
        }
        <div className={styles.addCourseDiv}>
          <button
            style={{
              background: addcourse ? "darkred" : "green",
              marginTop: "20px",
            }}
            className={styles.addCourseButton}
            onClick={() => setaddcourse((p) => !p)}
          >
            {addcourse ? "close" : "+ Add Course"}
          </button>
          {addcourse && (
            //add course

            <div className={styles.createCourseDiv}>
              <h2 className={styles.createCourseDivHeading}>Create Course</h2>
              {message && <p className={styles.messagep}>{message}</p>}

              <form className={styles.createCourseform}>
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  className={styles.createCourseTitleinput}
                  value={formData1.title}
                  onChange={handleChange2}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Course Description"
                  className={styles.createCourseDescinput}
                  value={formData1.description}
                  onChange={handleChange2}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className={styles.createCourseCatinput}
                  value={formData1.category}
                  onChange={handleChange2}
                  required
                />

                {formData1.tags.length > 0 && (
                  <ul className={styles.createCourseTagList}>
                    {formData1.tags.map((tag, index) => (
                      <li
                        key={index}
                        className={styles.createCourseTagListitem}
                      >
                        {tag}{" "}
                        <button
                          type="button"
                          style={{ background: "red", color: "white" }}
                          onClick={() =>
                            setFormData1((prevData) => ({
                              ...prevData,
                              tags: prevData.tags.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  type="text"
                  name="tags"
                  placeholder="Enter tag"
                  className={styles.createCourseTaginput}
                  value={currtag}
                  onChange={handleChangetags}
                  required
                />
                <button className={styles.addTag} onClick={addtag}>
                  add tag
                </button>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className={styles.createCourseImginput}
                  accept="image/*"
                  required
                />

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={styles.createCoursesubmit}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Course"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* done */}

        <div className={styles.coursesSection}>
          <h3>Your Courses</h3>

          <div className={styles.courseList}>
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className={styles.courseCard}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={styles.coursecover}
                  />
                  <div className={styles.courseDetails}>
                    <h4 className={styles.courseTitle}>{course.title}</h4>

                    <div className={styles.courseButtons}>
                      <button
                        className={styles.editButton}
                        onClick={() => navigate(`/teacher/profile/course/edit/${course._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteCourse(course._id)}
                        disabled={delCourseLoading===course._id}
                      >
                        {(delCourseLoading===course._id)?"deleting...":"delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default TeacherProfile;
