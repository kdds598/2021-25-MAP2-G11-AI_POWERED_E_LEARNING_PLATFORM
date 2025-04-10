
import admin from "../firebase.js";

export async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;
    
    if (!idToken) {
      return res.status(401).json({message:"Unauthorized"});
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      
      
      const userRecord = await admin.auth().getUser(decodedToken.uid);

      req.user = userRecord;
     
      next();
    } catch (error) {
      console.log(error);
      
      return res.status(401).json({message:"Unauthorized Request"});
    }
  }