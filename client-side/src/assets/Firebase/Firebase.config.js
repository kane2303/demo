// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Basic guard to help diagnose missing env vars at dev time
const requiredEnv = [
  "VITE_APIKEY",
  "VITE_AUTHDOMAIN",
  "VITE_PROJECTID",
  "VITE_STORAGEBUCKET",
  "VITE_MESSAGINGSENDERID",
  "VITE_APPID",
];
const missing = requiredEnv.filter((k) => !import.meta.env[k]);
if (missing.length) {
  // eslint-disable-next-line no-console
  console.error(
    `Firebase config is missing env variables: ${missing.join(", ")}.\n` +
    "Ensure client-side/.env has these set and restart the dev server."
  );
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);