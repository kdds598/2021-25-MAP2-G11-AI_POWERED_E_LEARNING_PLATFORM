
import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase"; // Import Firebase instance and Google provider
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup ,updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/StudentSignin.module.css";
const SigninComponent = () => {
  const navigate = useNavigate();
 
  const [isSignin, setIsSignin] = useState(false);
  

  return (
    <div 
    className={styles.outerDiv}
    >
      <h2 
      className={styles.heading}
    style={{alignSelf:"center"}}
    >{"Student Login"}</h2>
      
    
     
      <button
       onClick={()=>navigate('student/signin')} 
             className={`${styles.button} ${styles["login-button"]}`}
      >
        { "Student Login"}
      </button>
      <button 
       onClick={()=>navigate('teacher/signin')}        className={`${styles.button} ${styles["google-button"]}`}
       >
        { "Teacher Login"}
        </button>
      <p onClick={() => setIsSignin((p)=>!p)} 
      style={{ cursor: "pointer", marginTop: "10px",alignSelf:"center",color:isSignin?'red':'blue' }}
      >
        { isSignin?"close": "Don't have an account? Sign Up"}
      </p>

    {

        isSignin &&(
<>
            <button
            onClick={()=>navigate('student/signup')} 
                  className={`${styles.button} ${styles["login-button"]}`}
           >
             { "Student Signup"}
           </button>
           <button 
            onClick={()=>navigate('teacher/signup')}        className={`${styles.button} ${styles["google-button"]}`}
            >
        { "Teacher Signup"}
        </button>

             </>
        )
    }

    </div>
  );
};

export default SigninComponent;
