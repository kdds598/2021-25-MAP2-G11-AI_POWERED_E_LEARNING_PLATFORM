

import { Teacher } from "../Models/teacher.model.js";

export const searchTeachers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      const teachers = await Teacher.find({});
      return res.status(200).json({ teachers });
    
    }

    // Case-insensitive search in fullName or expertise (partial match in expertise)
    const teachers = await Teacher.find({
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { expertise: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.status(200).json({ teachers });
  } catch (error) {
    console.error("Error searching teachers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Define route


