import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase"; // Import Firebase instance and Google provider
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/StudentSignin.module.css";
const StudentSignin = () => {
  const [signLoading, setSignLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_REGISTER_Google_USER =
    "http://localhost:5000/api/student-google-signup";

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await fetch(API_REGISTER_Google_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      alert("Signed in with Google successfully!");
      navigate("/courses");

    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    setSignLoading(true);
    setError("");
    setMessage("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
    
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setMessage("Login successful!");
      navigate("/courses");
    } catch (err) {
      setError(err.message);
    } finally {
      setSignLoading(false);
    }
  };



  return (
    <div
      className={styles.outerDiv}
    >
      <h2 className={styles.heading} style={{ alignSelf: "center" }}>
        {"Student Login"}
      </h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className={styles["input-style"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className={styles["input-style"]}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button
        onClick={handleAuth}
        className={`${styles.button} ${styles["login-button"]}`}
        disabled={signLoading}
      >
        {signLoading ? "Logging in ...." : "Login"}
      </button>
      <button
        onClick={handleGoogleSignIn}
        className={`${styles.button} ${styles["google-button"]}`}
      >
        Sign in with Google
      </button>
      <p
        onClick={() => navigate("/auth/student/signup")}
        style={{
          cursor: "pointer",
          marginTop: "10px",
          alignSelf: "center",
          color: "blue",
        }}
      >
        {"Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default StudentSignin;
