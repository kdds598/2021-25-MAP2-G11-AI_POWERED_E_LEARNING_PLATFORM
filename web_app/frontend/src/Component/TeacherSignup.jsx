import React, { useState } from "react";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "../../firebase.js"; // Import Firebase app
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../Styles/TeacherSignup.module.css";
import { InputOtp } from "primereact/inputotp";
import { useNavigate } from "react-router-dom";

const TeacherSignup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [sendOtoLoading, setsendOtoLoading] = useState(false);
  const [verifyOtpLoading, setverifyOtpLoading] = useState(false);
  const [registerLoading, setregisterLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    expertise: [],
    education: [
      { degree: "", specialization: "", institute: "", yearOfCompletion: "" },
    ],
    linkedinProfile: "",
    bio: "",
    otp: "",
    password: "",
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e, index = null, field = null, type = null) => {
    const { name, value } = e.target;

    if (type === "education") {
      setFormData((prevData) => {
        const updatedEducation = [...prevData.education];
        updatedEducation[index][field] = value;
        return { ...prevData, education: updatedEducation };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const addEducation = () => {
    if (formData.education.length >= 3) {
      alert("You can add max 3 education details");
      return;
    }
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", specialization: "", institute: "", yearOfCompletion: "" },
      ],
    });
  };

  const deleducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExpertise = () => {
    if (
      expertiseInput.trim() !== "" &&
      !formData.expertise.includes(expertiseInput)
    ) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, expertiseInput],
      });
      setExpertiseInput("");
    }
  };

  const validateStep1 = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.contact.trim() || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Valid 10-digit Contact is required";
    if (formData.expertise.length === 0)
      newErrors.expertise = "At least one expertise is required";

    if (formData.education.length > 0) {
      for (let i = 0; i < formData.education.length; i++) {
        if (
          !formData.education[i].degree ||
          !formData.education[i].specialization ||
          !formData.education[i].institute ||
          !formData.education[i].yearOfCompletion
        ) {
          newErrors[`education.${i}.degree`] = "Degree is required";
          newErrors[`education.${i}.specialization`] =
            "Specialization is required";
          newErrors[`education.${i}.institute`] = "Institute is required";
          newErrors[`education.${i}.yearOfCompletion`] =
            "Year of Completion is required";
        }
      }
    } else {
      newErrors.education = "At least one education is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const sendOTP = async () => {
    setsendOtoLoading(true)
    if (!validateStep1()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", {
        email: formData.email,
      });
      alert(response.data.message);
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }finally{
      setsendOtoLoading(false)
    }
  };


  const verifyOTP = async () => {
    
    if(otp.length!==6){
      alert("Enter a valid 6-digit OTP");
      return;
    }
    setverifyOtpLoading(true)

    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { email: formData.email, otp: otp.join('')
        }
      );
      alert(response.data.message);
      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
    finally{
      setverifyOtpLoading(false)

    }
  };

  const validateStep3 = () => {
    if (!formData.password || formData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters long" });
      return false;
    }
    return true;
  };

 
  const registerTeacher = async () => {
    if (!validateStep3()) return;

    setregisterLoading(true)

    if (!formData.password || formData.password.length < 6) {
      setErrors?.({ password: "Password must be at least 6 characters long" });
      return;
    }

    try {
      // Sign in user
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = result.user;


      await updateProfile(user, {
        name: formData.fullName,
        type:"Teacher"
      });

      const token = await user.getIdToken(true);

      // Set up headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

     
      await axios.post("http://localhost:5000/api/protected", formData, {
        headers,
      });

      // Process response
      alert("Signed in successfully!");
    } catch (error) {

      alert(error.response?.data?.message || "Error registering teacher");
    }
    finally{

      setregisterLoading(false)
      navigate("/courses")

    }
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));

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
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }

  };

  return (
    <div  >
      {step === 1 && (

        <div className={styles.form}>

          
          <h2 style={{ justifySelf: "center" }}>Teacher Signup</h2>
          <h4 style={{marginTop:"20px"}}>Personal details</h4>
          <div className={styles.pd}>
            <div style={{ display: "inline" }}>
              <label>Full name : </label>
              <input
                className={styles["input-style"]}
                id="fullname"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
              />
              {errors.fullName && (
                <p style={{ color: "red" }}>{errors.fullName}</p>
              )}
            </div>
            <div style={{ display: "inline" }}>
              <label>Email : </label>

              <input
                className={styles["input-style"]}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div style={{ display: "inline" }}>
              <label>Contact no. : </label>

              <input
                className={styles["input-style"]}
                type="text"
                name="contact"
                placeholder="Contact"
                onChange={handleChange}
              />
              {errors.contact && (
                <p style={{ color: "red" }}>{errors.contact}</p>
              )}
            </div>
          </div>
          <h4 style={{marginTop:"10px",marginBottom:"10px"}}>Expertise</h4>
          <input
            className={styles["input-exp"]}
            type="text"
            placeholder="Enter expertise"
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
          />
          <button className={styles.aeb} onClick={addExpertise}>
            Add
          </button>
          <ul className={styles.expList}>
            {formData.expertise.map((subject, index) => (
              <li className={styles.expItem} key={index}>
                {subject}
              </li>
            ))}
          </ul>
          {errors.expertise && (
            <p style={{ color: "red" }}>{errors.expertise}</p>
          )}

          <h4
          style={{marginTop:"40px"}}
          >Education</h4>
          {errors.education && (
            <p style={{ color: "red" }}>{errors.education}</p>
          )}
          {formData.education.map((edu, index) => (
            <div className={styles.edDiv} key={index}>
          
              <select
                className={styles["input-ed"]}
                value={edu.degree}
                onChange={(e) => handleChange(e, index, "degree", "education")}
              >
                <option value="">Select Degree</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate's Degree">Associate's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                <option value="Diploma">Diploma</option>
                <option value="Professional Degree">Professional Degree</option>
                <option value="Vocational Training">Vocational Training</option>
              </select>
              {errors[`education.${index}.degree`] && (
                <p style={{ color: "red" }}>
                  {errors[`education.${index}.degree`]}
                </p>
              )}

              <select
                className={styles["input-ed"]}
                value={edu.specialization}
                onChange={(e) =>
                  handleChange(e, index, "specialization", "education")
                }
              >
                <option value="">Select Specialization</option>

                {/* Engineering and Technology */}
                <optgroup label="Engineering and Technology">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Electronics and Communication">
                    Electronics and Communication
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                </optgroup>

                {/* Business and Management */}
                <optgroup label="Business and Management">
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations Management">
                    Operations Management
                  </option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                  <option value="International Business">
                    International Business
                  </option>
                  <option value="Supply Chain Management">
                    Supply Chain Management
                  </option>
                </optgroup>

                {/* Science */}
                <optgroup label="Science">
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Environmental Science">
                    Environmental Science
                  </option>
                  <option value="Astronomy">Astronomy</option>
                  <option value="Genetics">Genetics</option>
                </optgroup>

                {/* Medical and Healthcare */}
                <optgroup label="Medical and Healthcare">
                  <option value="Medicine (MBBS)">Medicine (MBBS)</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Nutrition and Dietetics">
                    Nutrition and Dietetics
                  </option>
                </optgroup>

                {/* Arts and Humanities */}
                <optgroup label="Arts and Humanities">
                  <option value="Literature">Literature</option>
                  <option value="History">History</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Performing Arts">Performing Arts</option>
                </optgroup>

                {/* Law */}
                <optgroup label="Law">
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="International Law">International Law</option>
                  <option value="Intellectual Property Law">
                    Intellectual Property Law
                  </option>
                </optgroup>

                {/* Education */}
                <optgroup label="Education">
                  <option value="Early Childhood Education">
                    Early Childhood Education
                  </option>
                  <option value="Special Education">Special Education</option>
                  <option value="Educational Leadership">
                    Educational Leadership
                  </option>
                  <option value="Curriculum Design">Curriculum Design</option>
                </optgroup>

                {/* Others */}
                <optgroup label="Others">
                  <option value="Journalism and Mass Communication">
                    Journalism and Mass Communication
                  </option>
                  <option value="Hotel Management">Hotel Management</option>
                  <option value="Fashion Design">Fashion Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Animation and VFX">Animation and VFX</option>
                </optgroup>
              </select>
              {errors[`education.${index}.specialization`] && (
                <p style={{ color: "red" }}>
                  {errors[`education.${index}.specialization`]}
                </p>
              )}

              <input
                className={styles["input-ed"]}
                type="text"
                placeholder="Institute"
                value={edu.institute}
                onChange={(e) =>
                  handleChange(e, index, "institute", "education")
                }
              />
              {errors[`education.${index}.institute`] && (
                <p style={{ color: "red" }}>
                  {errors[`education.${index}.institute`]}
                </p>
              )}
              <input
                className={styles["input-ed"]}
                type="number"
                placeholder="Year of Completion"
                value={edu.yearOfCompletion}
                onChange={(e) =>
                  handleChange(e, index, "yearOfCompletion", "education")
                }
                id="yearOfCompletion"
                name="yearOfCompletion"
                min="1900"
                max="2099"
              />
              {errors[`education.${index}.yearOfCompletion`] && (
                <p style={{ color: "red" }}>
                  {errors[`education.${index}.yearOfCompletion`]}
                </p>
              )}
              <button
                className={styles.delexpertise}
                onClick={() => deleducation(index)}
              >
                remove
              </button>
            </div>
          ))}
          <button className={styles.addEducation} onClick={addEducation}>
            + Add More
          </button>

          <input
            className={styles.linkedin}
            type="text"
            name="linkedinProfile"
            placeholder="LinkedIn Profile"
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            onChange={handleChange}
          ></textarea>

          <button className={styles.sendotp} onClick={sendOTP}
          disabled={sendOtoLoading}
          >
{         sendOtoLoading?   "sending...":"Send OTP"
}          </button>

        
</div>
      )}

      {step === 2 && (
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

            <button className={styles.verifyButton} 
                          onClick={()=>{verifyOTP();         
                          }}
                          disabled={verifyOtpLoading}

                          >
                {verifyOtpLoading?"verifying...":"verify"}
                </button>
           

            <p className={styles.resendNote}>
              Didn't receive the code?{" "}
              <button className={styles.resendBtn} type="button"
              disabled={sendOtoLoading}
              onClick={sendOTP}
              >
                {sendOtoLoading?"sending...":"send again"}
              </button>
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.outerPassdiv}>
          <h2>Enter Your Password: </h2>
          <input
          className={styles["input-style"]}
            type="password"
            name="password"
            placeholder="Set Password"
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button className={styles.signupBtn} onClick={registerTeacher}
          disabled={registerLoading}
          >{registerLoading?"signing...":"Signup"}</button>
        </div>
      )}
    </div>
  );
};

export default TeacherSignup;
