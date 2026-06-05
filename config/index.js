// const env = process.env.NODE_ENV || 'development';
// const isDev = env === 'development';
// const isServer = typeof window === "undefined";

// const config = {
//   development: {
//     isDev,
//     isServer,
//     SERVER_PROTOCOL: process.env.DEV_SERVER_PROTOCOL,
//     HTTP_SERVER_PORT: process.env.DEV_HTTP_SERVER_PORT,
//     HTTPS_SERVER_PORT: process.env.DEV_HTTPS_SERVER_PORT,
//     API_URL: process.env.NEXT_PUBLIC_DEV_API_URL,
//   },
//   production: {
//     isDev,
//     isServer,
//     SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
//     HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT,
//     HTTPS_SERVER_PORT: process.env.HTTPS_SERVER_PORT,
//     API_URL: process.env.NEXT_PUBLIC_API_URL,
//   },
// };

// module.exports = config[env];

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVGUBau7cw-KtUFDVMQ28aGVr37UPaToM",
//   authDomain: "flweb-9d869.firebaseapp.com",
//   projectId: "flweb-9d869",
//   storageBucket: "flweb-9d869.firebasestorage.app",
//   messagingSenderId: "797672616271",
//   appId: "1:797672616271:web:6fdbf098ebc627d581153a",
//   measurementId: "G-1C5Z4HR5KS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVGUBau7cw-KtUFDVMQ28aGVr37UPaToM",
  authDomain: "flweb-9d869.firebaseapp.com",
  projectId: "flweb-9d869",
  storageBucket: "flweb-9d869.firebasestorage.app",
  messagingSenderId: "797672616271",
  appId: "1:797672616271:web:6fdbf098ebc627d581153a",
  measurementId: "G-1C5Z4HR5KS"
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

export default db;
