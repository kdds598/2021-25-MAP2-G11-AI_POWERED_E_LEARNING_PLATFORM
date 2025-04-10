import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pencil, Trash, Save, Upload } from "lucide-react";
import styles from "../Styles/EditCourse.module.css";

const EditCourse = () => {
  const { courseId } = useParams();
  const[delLoading,setDelLoading]=useState(null);
  const [courseLoading, setCourseLoading] = useState(false);
  const [videosLoading, setvideosLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [addVideo, setAddVideo] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setvideosLoading(true)

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/courses/id/${courseId}`
        );
        setCourse(data.course);

        if (data.course.videos && data.course.videos.length > 0) {
          // Fetch video details using their object IDs
          const videoRequests = data.course.videos.map((videoId) =>
            axios.get(`http://localhost:5000/api/videos/id/${videoId}`)
          );

          const videoResponses = await Promise.all(videoRequests);
          const fetchedVideos = videoResponses.map((res) => res.data.video);
          setVideos(fetchedVideos);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }finally{
        setvideosLoading(false)
      }
    };

    fetchCourseData();
  }, [courseId]);
  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const handleDeleteVideo = async (videoId) => {
    setDelLoading(videoId);
    const res = await axios.delete(
      `http://localhost:5000/api/course/${courseId}/video/${videoId}`
    );
    setVideos(videos.filter((v) => v._id !== videoId));
    setDelLoading(null);
  };

  const handleTagDelete = (index) => {
    const updatedTags = course.tags.filter((_, i) => i !== index);
    setUpdatedData({ ...updatedData, tags: updatedTags });
    setCourse({ ...course, tags: updatedTags });
  };

  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    const updatedTags = [...course.tags, newTag.trim()];
    setUpdatedData({ ...updatedData, tags: updatedTags });
    setCourse({ ...course, tags: updatedTags });
    setNewTag("");
  };

  const handleSave = async () => {
    setCourseLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "description",
        updatedData.description || course.description
      );
      formData.append("category", updatedData.category || course.category);
      (updatedData.tags || course.tags).forEach((tag) => {
        formData.append("tags[]", tag);
      });
      if (newThumbnail) {
        formData.append("thumbnail", newThumbnail);
      }

      const res = await axios.put(
        `http://localhost:5000/api/courses/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setCourse(res.data.course);
 
      setEditing(false);
      setNewThumbnail(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
    finally {
      setCourseLoading(false);
    }
  };

  /*start */
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "video") setVideo(files[0]);
    if (name === "thumbnail") setThumbnail(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return setMessage("Please select a video");

    const formData = new FormData();
    formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("uid", "bFe5msDjWqQHAJR4qjLD0FeJM4K3");

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/add-video`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${token}`, // Assuming token-based authentication
          // },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage("Video uploaded successfully!");
        setTitle("");
        setDescription("");
        setVideo(null);
        setThumbnail(null);
        setVideos((p) => [...p, data.video]);
        setAddVideo(false);
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Error uploading video");
    } finally {
      setLoading(false);
    }
  };
  /*end*/

  if (!course) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {course.title}
        {!editing ? (
          <button
            className={styles.iconButton}
            style={{
              backgroundColor: "rgba(47, 153, 252, 0.463)",
              borderRadius: "4px",
              padding: "4px",
              border: "solid black 1px",
              color: "black",
            }}
            onClick={handleEdit}
          >
            <Pencil size={18} /> Edit
          </button>
        ) : (
          <button
            className={styles.iconButton}
            style={{
              backgroundColor: "rgba(47, 252, 167, 0.46)",
              borderRadius: "4px",
              padding: "4px",
              border: "solid black 1px",
              color: "black",
            }}
            onClick={handleSave}
              disabled={courseLoading}
          >
            <Save size={18} />{courseLoading ? "Saving..." : "Save"}
          </button>
        )}
      </h2>

      {/* Thumbnail Section */}
      <div className={styles.thumbnailSection}>
        <img
          src={course.thumbnail}
          alt="Course Thumbnail"
          className={styles.thumbnail}
        />
        {editing && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewThumbnail(e.target.files[0])}
              style={{ display: "block" ,
                backgroundColor: "rgba(57, 239, 255, 0.26)",
                borderRadius: "6px",
                padding: "2px",
                marginTop:"6px",
                width: "191px",

                border: "double rgba(5, 59, 64, 0.26) 4px",
                color: "black"
              }}
              id="thumbnailUpload"
            />
            <label htmlFor="thumbnailUpload" className={styles.uploadButton}>
              <Upload size={16} /> Change Thumbnail
            </label>
          </div>
        )}

      </div>

      {/* Editable Fields */}
      <textarea
        className={styles.textarea}
        name="description"
        defaultValue={course.description}
        onChange={handleChange}
        disabled={!editing}
      />

      <input
        className={styles.input}
        name="category"
        defaultValue={course.category}
        onChange={handleChange}
        disabled={!editing}
        placeholder="Category"
      />

      {/* Tags Section */}
      <div className={styles.tagsSection}>
        <h3>Tags</h3>
        <div className={styles.tagsContainer}>
          {course.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}{" "}
              {editing && (
                <button
                  onClick={() => handleTagDelete(index)}
                  className={styles.deleteTagButton}
                >
                  <Trash size={14} />
                </button>
              )}
            </span>
          ))}
        </div>

        {editing && (
          <div className={styles.addTagContainer}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag"
              className={styles.tagInput}
            />
            <button onClick={handleAddTag} className={styles.addTagButton}>
              + Add Tag
            </button>
          </div>
        )}
      </div>

      <div className={styles.videos}>
        <h2 className={styles.subtitle}>Course Videos</h2>
        
        {videosLoading? <p>Loading...</p>
        :
        videos?.length > 0 ? (
          videos.map((video, index) => (
            <div key={video._id} className={styles.videoCard}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className={styles.videoThumbnail}
              />
              <div className={styles.videoDetails}>
                <h3 className={styles.videoTitle}>
                  Lecture {index + 1}: {video.title}
                </h3>
                <p className={styles.videoDescription}>{video.description}</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteVideo(video._id)}
                style={{
                  backgroundColor: "rgb(177, 8, 8)",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "white",
                }}
                disabled={delLoading===video._id}
              >
                <Trash size={16} /> {delLoading===video._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p>No videos available for this course.</p>
        )
        
        }
      </div>

      <button
        className={styles.addButton}
        onClick={() => setAddVideo((prev) => !prev)}
      >
        Add Video
      </button>

      {addVideo && (
        <div className={styles.uploadContainer}>
          <h2>Upload Video</h2>
          {message && <p className={styles.message}>{message}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />

            <textarea
              placeholder="Video Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              required
            />

            <label className={styles.fileLabel}>
              Select Video:
              <input
                type="file"
                name="video"
                accept="video/*"
                style={{ display: "block" ,
                  backgroundColor: "rgba(57, 239, 255, 0.26)",
                  borderRadius: "6px",
                  padding: "2px",
                  marginTop:"6px",
  
                  border: "double rgba(5, 59, 64, 0.26) 4px",
                  color: "black"
                }}
                onChange={handleFileChange}
                required
              />
            </label> 



             <label className={styles.fileLabel}>
              Select Thumbnail:
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                style={{ display: "block" ,
                  backgroundColor: "rgba(57, 239, 255, 0.26)",
                  borderRadius: "6px",
                  padding: "2px",
                  marginTop:"6px",
  
                  border: "double rgba(5, 59, 64, 0.26) 4px",
                  color: "black"
                }}
                onChange={handleFileChange}
              />
            </label>

            <button type="submit" className={styles.button} 
            style={{backgroundColor:"rgba(5, 151, 68, 0.93)",border:"none",borderRadius:"4px",padding:"12px 4px",color:"white",width:"100%"}}

            disabled={loading}>
              {loading ? "please wait Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse;









































































// <label htmlFor="videoUpload" style={{ 
//   display: "block",
//   cursor: "pointer",
//   backgroundColor: "rgba(57, 239, 255, 0.26)",
//   borderRadius: "8px",
//   padding: "2px 6px",
//   marginTop: "10px",
//   border: "2px solid rgba(5, 59, 64, 0.5)",
//   color: "#053b40",
//   fontWeight: "bold",
//   textAlign: "center",
//   width: "fit-content",
//   transition: "all 0.3s ease-in-out"
// }}>
//   📂 Upload video
//   <input 
//     type="file" 
//     id="videoUpload" 
//     name="video" 
//     accept="video/*" 
//     style={{ display: "block" }} 
//     onChange={handleFileChange} 
//     required 
//   />
// </label>

// <label htmlFor="thumbnailUpload" style={{ 
//   display: "block",
//   cursor: "pointer",
//   backgroundColor: "rgba(57, 113, 255, 0.81)",
//   borderRadius: "8px",
//   padding: "2px 6px",
//   marginTop: "10px",
//   border: "2px solid rgba(5, 59, 64, 0.5)",
//   color: "#053b40",
//   fontWeight: "bold",
//   textAlign: "center",
//   width: "fit-content",
//   transition: "all 0.3s ease-in-out"
// }}>
//   📂 Upload thumbnail
//   <input 
//     type="file" 
//     id="thumbnailUpload" 
//     name="thumbnail" 
//     accept="image/*" 
//     style={{ display: "block" }} 
//     onChange={handleFileChange} 
//     required 
//   />
// </label>