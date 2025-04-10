
import React, { useState } from "react";
import { auth } from "../../firebase"; // Import Firebase instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import styles from "../Styles/StudentSignin.module.css";
import { useNavigate } from "react-router-dom";
const TeacherSignin = () => {
  const navigate = useNavigate();

  const [signLoading,setSignLoading]=useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    setSignLoading(true)
    setError("");
    setMessage("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setMessage("Login successful!");
    } catch (err) {
      setError(err.message);
    }finally{
      setSignLoading(false)
    }
  };

  return (
    <div 
        className={styles.outerDiv}
    
    >
      <h2
       className={styles.heading}
          style={{alignSelf:"center"}}
      >{"Teacher Login"}</h2>
            <label>Email:</label>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
                className={styles["input-style"]}
        
      />
            <label>Password:</label>

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
                className={styles["input-style"]}
        
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
     {
        message&& navigate("/courses")
      }
      <button onClick={handleAuth}
                   className={`${styles.button} ${styles["login-button"]}`}
                   disabled={signLoading}
      
       >
        { signLoading?"Logging in ...":"Login"}
      </button>
      <p 
            style={{ cursor: "pointer", marginTop: "10px",alignSelf:"center" }}

      onClick={() =>  navigate("/auth/teacher/signup")}>
        {"Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default TeacherSignin;

