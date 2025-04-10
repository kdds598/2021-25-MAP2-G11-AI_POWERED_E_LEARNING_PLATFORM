
import { Teacher } from "../Models/teacher.model.js";
import { Student } from "../Models/Student.Model.js";


export const getUserByUid = async (req, res) => {
  try {
    // const { uid } = req.params;
    let type=""
    const {uid}=req.user;
    
    
    // Try to find the user in the Teacher collection
    let user = await Teacher.findOne({ uid });
    if(user){
      type="Teacher"
    }

    if (!user) {
      // If not found, search in the Student collection
      user = await Student.findOne({ uid });
      if(user){
        type="Student"
        }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({user,type});
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
