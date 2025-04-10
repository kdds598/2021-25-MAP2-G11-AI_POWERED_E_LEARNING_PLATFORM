import React, { Children, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

import { useAuth } from "../Context/Context";
import { signOut } from "firebase/auth";


const Navbar = () => {
  
  const { auth, user, uloading,type,userDetails } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("User logged out successfully!");
    } catch (er) {
      console.error("Error logging out:", er.message);
            alert(er.data.message)
      
    }
  };
  return (
    <>
      <div className={styles["navbar-div"]}>
        <nav className={styles["navbar"]}>
          <div className={styles["logo"]}>
            <h2 style={{fontFamily:"revert-layer"}}>ELS</h2>
          </div>
          <div className={styles["right-nav"]}>
            {
            uloading ? (
              <button id={styles["login"]} onClick={handleLogout}>
                Loading...
              </button>
            ) : user ? (
              <button id={styles["login"]} onClick={handleLogout}>
                Sign out
              </button>
            ) : (
              <Link id={styles["login"]} to={"/auth"}>
                signin
              </Link>
            )
            
            }
            <div className={styles["menu-toggle"]} onClick={toggleMenu}>
              <span className={styles["bar"]}></span>
              <span className={styles["bar"]}></span>
              <span className={styles["bar"]}></span>
            </div>
          </div>
        </nav>

        <ul className={styles["nav-links"]}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">courses</Link>
          </li>
          <li>
            <Link to="/teachers">teachers</Link>
          </li>
       
          <li>
            <Link to={type==='Teacher'?`/teacher/profile/${userDetails._id}`:(type==='Student')?"/profile":"/"}>Profile</Link>
          </li>
        </ul>
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margintop: "20px",
          }}
        >
          <div className={styles["menu-toggle2"]} onClick={toggleMenu}>
            <span className={styles["bar2"]}></span>
            <span className={styles["bar2"]}></span>
            <span className={styles["bar2"]}></span>
          </div>
        </div>
        <ul className={styles["sidebar-links"]}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
         
          <li>
            <Link to="/courses" onClick={toggleMenu}>
            courses
            </Link>
          </li>
          <li>
            <Link to="/teachers" onClick={toggleMenu}>
            teachers
            </Link>
          </li>
          <li>
        
                        <Link to={type==='Teacher'?`/teacher/profile/${userDetails._id}`:(type==='Student')?"/profile":"/"}>Profile</Link>

          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
