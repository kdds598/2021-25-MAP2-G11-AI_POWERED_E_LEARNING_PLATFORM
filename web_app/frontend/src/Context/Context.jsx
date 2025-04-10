
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [udLoading,setudLoading]= useState(false);
  const [user, uloading, uerror] = useAuthState(auth);
  const [idToken, setIdToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    setudLoading(true)
    if (user) {
      user.getIdToken()
        .then(async (token) => {
          setIdToken(token);

          const response = await axios.get("http://localhost:5000/api/get-user-by-UID", {
            headers: {
              Authorization: `${token}`, // ✅ Corrected token format
            },
          });

        

          setUserDetails(response.data.user);
          setType(response.data.type);
        })
        .catch((err) => {
          console.error("Error fetching ID token or user details:", err)
        }).finally(
          ()=>setudLoading(false)

        )
      }
  }, [user]);

  return (
    <AuthContext.Provider value={{ udLoading,user, uloading, uerror, auth, idToken, userDetails, type }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
