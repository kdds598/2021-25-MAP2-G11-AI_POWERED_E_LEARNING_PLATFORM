import { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import axios from "axios";
import styles from "../Styles/Studentsignup.module.css";
import { useNavigate } from "react-router-dom";

const StudentSignup = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate=useNavigate();
  const [option, setOption] = useState(null);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const [verified, setVerified] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  //Loading
  const [senOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const API_SEND_OTP = "http://localhost:5000/api/send-otp";
  const API_VERIFY_OTP = "http://localhost:5000/api/verify-otp";
  const API_REGISTER_USER = "http://localhost:5000/api/student-email-register";
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
      // alert("Signed in successfully!");
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const sendOtp = async () => {
    setSendOtpLoading(true);
    try {
      const { fullName, email } = userData;
      if (!fullName || !email) {
        alert("Please enter your full name and email.");
        return;
      }

      const response = await axios.post(API_SEND_OTP, { email });
      if (response.data.message) {
        setOtpSent(true);
        setStep(2);
        alert("OTP sent successfully. Check your email.");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      alert("Failed to send OTP.");
    } finally {
      setSendOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    setVerifyOtpLoading(true);
    try {
      const { email } = userData;
      const otp1 = otp.join("");
      if (!otp1) {
        alert("Enter the OTP received.");
        return;
      }
      const response = await axios.post(API_VERIFY_OTP, { email, otp: otp1 });
      if (response.data.message) {
        setVerified(true);
        setStep(3);
        alert("OTP verified. Now set your password.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Failed to verify OTP.");
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    setRegisterLoading(true);
    e.preventDefault();
    try {
      const { email, password } = userData;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;
      await updateProfile(user, {
        name: userData.fullName,
        type:"Student"
      });

      const token = await result.user.getIdToken();

      const response = await fetch(API_REGISTER_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ email, fullName: userData.fullName }),
      });

      alert("Signed in successfully!");
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Email Signup Error:", error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleChange2 = (element, index) => {
    let value = element.value;

    if (/[^0-9]/.test(value)) return; // Only allow numbers

    let newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Handle backspace to move to previous input
    else if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Student Registration</h2>

      {registrationSuccess && navigate("/courses")
                

      
      }

      {!option && !registrationSuccess && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setOption("email")}
            className={`${styles.button} ${styles.emailButton}`}
          >
            Sign up with Email & Password
          </button>
          <button
            onClick={handleGoogleSignIn}
            className={`${styles.button} ${styles.googleButton}`}
          >
            Sign up with Google
          </button>
        </div>
      )}

      {option === "email" && step === 1 && !registrationSuccess && (
        <div className={styles.inputContainer}>
          <label>Full name : </label>

          <input
            type="text"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            className={styles["input-style"]}
          />
          <label>Email : </label>

          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className={styles["input-style"]}
          />
          <button
            onClick={sendOtp}
            className={`${styles.button} ${styles.otpButton}`}
            disabled={senOtpLoading}
          >
            {senOtpLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      )}

      {step === 2 && !registrationSuccess && (
        <div className={styles.outerOTPDiv}>
          <div className={styles.otpForm}>
            <span className={styles.mainHeading}>Enter OTP</span>
            <p className={styles.otpSubheading}>
              We have sent a verification code to your mobile number
            </p>

            <div className={styles["otp-container"]}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange2(e.target, index)}
                  className={styles["otp-input"]}
                />
              ))}
            </div>

            <button
              className={styles.verifyButton}
              onClick={() => {
                verifyOtp();
              }}
              disabled={verifyOtpLoading}
            >
              {verifyOtpLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>

            <button className={styles.verifyButton} 
            onClick={()=>{sendOtp(); }}
            disabled={senOtpLoading}>
                {senOtpLoading?"sending...":"send again"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && !registrationSuccess && (
        <form className={styles.pdiv} onSubmit={handleEmailSignup}>
          <label>Enter your password:</label>
          <input
            type="password"
            placeholder="Set Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className={styles["input-style"]}
          />
          <button
            type="submit"
            className={`${styles.button} ${styles.completeButton}`}
            disabled={registerLoading}
          >
            {registerLoading ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentSignup;
