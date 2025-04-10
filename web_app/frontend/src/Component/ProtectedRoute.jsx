import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Context"; // Assuming you have a context for authentication
import { FaExclamationCircle } from "react-icons/fa";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user, uloading } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (!uloading) {
      if (!user) {
        setIsUserLoggedIn(false);
      
      } else {
        setIsUserLoggedIn(true);
      }
    }
  }, [user, uloading]);
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;


  if (isUserLoggedIn) {
    return <>{element}</>;
  }

  if(uloading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          margin: "60px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap:"20px",
            backgroundColor: "rgba(65, 126, 239, 0.17)",
            color: "rgb(50, 19, 164)",
            padding: "30px 40px",
            borderRadius: "10px",
            border: "1px solid rgba(63, 17, 228, 0.12)",
            fontWeight: "bold",
            fontSize: "24px", // Larger text size
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            width: "100%", // Ensures the alert fills its container
            maxWidth: "600px", // Maximum width to prevent it from becoming too large
          }}
        >
          <div>
          <FaExclamationCircle
            style={{
              marginRight: "10px",
              fontSize: "20px",
            }}
          />
          <span >Getting your Signup details ...</span>
          </div>
          <Lodinder></Lodinder>
        </div>
      </div>
    );

  }
  
  else{
  return (
    <>
  
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        margin: "60px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "30px 40px",
          borderRadius: "10px",
          border: "2px solid #f5c6cb",
          fontWeight: "bold",
          fontSize: "24px", 
          textAlign: "center",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          width: "100%", 
          maxWidth: "600px", 
        }}
      >
        <FaExclamationCircle
          style={{
            marginRight: "10px",
            fontSize: "20px",
          }}
        />
        <span>Your are not logged in, Sign in to use this feature</span>
      </div>
    </div>
    </>
  );
}


};

export default ProtectedRoute;
