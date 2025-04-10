import React, { useState, useEffect } from "react";
import styles from "../Styles/UserProfile.module.css";
import { FaUserSecret, FaUserAstronaut } from "react-icons/fa";
import { useAuth } from "../Context/Context.jsx";
import { Form } from "react-router-dom";
import Footer from "./Footer.jsx";


const UserProfile = () => {
 
  const [loginmethod, setLoginmethod] = useState(null);
  const [photoURL, setphotoURL] = useState("");

  


  const { user,udLoading, uloading,idToken,userDetails } = useAuth();
 
    
  let formattedDate = "";
  if (!uloading && user) {
    const creationTime = user.metadata.creationTime;
    const date = new Date(creationTime);
    formattedDate = date.toLocaleDateString();
  }

  useEffect(() => {
    if (user) {
      setphotoURL(user.photoURL);

      try {
        if (user.isAnonymous) {
          setLoginmethod("anonymous");
        } else {
          setLoginmethod(user.providerData[0]?.providerId || "unknown");
        }
      } catch (error) {
        console.error("Error determining login method:", error);
      }
    }
  }, [user]);
  
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;
 
  if (uloading||udLoading||!user) {
    return <p>Loading...</p>
  }
  return (
<>
    <div className={styles["Acc-info-container"]}>
      <h1 className={styles["Acc-heading"]}>User Profile</h1>
      <p>
        Welcome to your profile page, where you can view your personal
        information and details!
      </p>

      <div className={styles["Acc-sub-text"]}>
        <div className={styles["inn1subt"]}>
          <h2 style={{ wordBreak: "break-word" }}>
            User name: {userDetails?.fullName || user.displayName || user.name  || "N/A"}
          </h2>
          <h2 id={styles["fft"]} style={{ wordBreak: "break-word" }}>
            Email: {user.email || "N/A"}
          </h2>
          <h3 style={{ color: "#334155" }}>Login method: {loginmethod}</h3>
          <h3 style={{ color: "#334155" }}>Member since: {formattedDate}</h3>
        </div>

        

        <div className={styles["inn2subt"]} style={{ alignSelf: "center" }}>
          {loginmethod === "anonymous" && <FaUserSecret size={160} />}
          {(loginmethod === "password"||"google.com") && (
            <FaUserAstronaut size={160} color="white" />
          )}
         
        </div>
      </div>

     
    </div>
    <Footer/>
</>
  );
};

export default UserProfile;
