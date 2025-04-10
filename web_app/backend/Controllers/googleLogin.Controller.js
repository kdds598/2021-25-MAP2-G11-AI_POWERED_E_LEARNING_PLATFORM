
import { Student } from "../Models/Student.Model.js";

export const createUser = async (req, res) => {
 
  const { uid, name, email, displayName, picture, photoURL } = req.user;


  let user = await Student.findOne({ uid });
  if (user) {
    if (req.user.providerData.length >= 0 && req.user.providerData[0].providerId === 'google.com') {
      user.profilePicture = photoURL;
      user.fullName = displayName;
      await user.save();
      return res.send(user);
    }
  } else {
    user = new Student({
      uid,
      email:email||undefined,
      fullName: name || displayName,
      profilePicture:photoURL,
    });
    await user.save();
  }

  res.send(user);
};
