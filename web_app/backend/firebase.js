// Import the admin module from the Firebase Admin SDK
import admin from "firebase-admin";
import dotenv from 'dotenv';
// Import the service account credentials
// import serviceAccount from "./expense-tracey-firebase-adminsdk-i264k-9972a69487.json" assert { type: "json" };
dotenv.config();

// const serviceAccount1 = JSON.parse(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT);
// console.log(serviceAccount);
const serviceAccount2={
  type: process.env.type,
  project_id:process.env.project_id ,
  private_key_id:process.env.private_key_id ,
  private_key: process.env.private_key.replace(/\\n/g, '\n'),
  client_email:process.env.client_email ,
  client_id:process.env.client_id ,
  auth_uri:process.env.auth_uri ,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url:process.env.client_x509_cert_url ,
  universe_domain:process.env.project_id
};

// const serviceAccount2=process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT

// console.log(serviceAccount);

// Initialize the Firebase Admin app with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2)
});

export default admin;

