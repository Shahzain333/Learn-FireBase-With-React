import { initializeApp } from "firebase/app";
// Import Messaging from firebase
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQl69C5gRfwNFF-PXR75h0w9cOdtRUtBg",
  authDomain: "web-notification-e9eed.firebaseapp.com",
  projectId: "web-notification-e9eed",
  storageBucket: "web-notification-e9eed.firebasestorage.app",
  messagingSenderId: "714636090903",
  appId: "1:714636090903:web:666851d86ba54ec4cd4652"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);








