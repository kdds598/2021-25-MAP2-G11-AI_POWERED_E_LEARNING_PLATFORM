import React from "react";
import styles from "../Styles/Footer.module.css"; 
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.intofooterinner}>
        <div className={styles.footerContainer}>
          <div className={styles.entryText}>
           <h1 style={{color:"white"}}>ELS</h1>
            <p
            >
            ELS – Unlock smarter learning with AI. Designed with passion and care.
            </p>
          </div>

          <div id={styles.contactus1}>
            <h2 style={{color:"white"}}>  Connect with us</h2>
            <div>
              <h3 style={{ color: "white" }}>mail : example@gmail.com</h3>

              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  color: "white",
                }}
              >
                <IoLogoLinkedin color="white" size={40} />
                Linkedin
                <a
                  id={styles.linkedinbutton}
              
                  target="_blank"
                  href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
                >
                  Let's Connect
                </a>
              </h4>
            </div>
          </div>
        </div>

        <div className={styles.wholeindiv}>
          <h2 style={{ marginBottom: "20px", textAlign: "center",color:"white" }}>
            Quick Links
          </h2>

          <div className={styles.centerContainer}>
            <Link className={styles.flink} to="/">
              Home
            </Link>
            {/* <Link className={styles.flink} to="/home">
              About Us
            </Link> */}
            <Link className={styles.flink} to="/courses">
              courses
            </Link>
            <Link className={styles.flink} to="/teachers">
              teachers
            </Link>
            <Link className={styles.flink} to="/profile">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div id={styles.contactus2}>
        <h2 style={{ color: "white" }}>Connect with us</h2>
        <div>

          <h4
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
              color: "white",
            }}
          >
            <IoLogoLinkedin color="white" size={40} />
            Linkedin
            <a
              id={styles.linkedinbutton}
           
              target="_blank"
              href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
            >
              Let's Connect
            </a>
          </h4>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <p style={{ textAlign: "center" }}>
          &copy; 2025 ELS, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
