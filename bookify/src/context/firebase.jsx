import { createContext, use, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
//Authentication from user import
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged 
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
};

const FirebaseContext = createContext(null)

//console.log(firebaseConfig);
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Instance of Authentication
const firebaseAuth = getAuth(firebaseApp);
// Instance of Google Authentication Provider
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

  // Track the User make State and useEffect And onAUthStateChanged check the current user
  const [user,setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      
      //console.log("User", user)
      if(user){
        return setUser(user)
      }else {
        return setUser(null)
      }

    })

  }, [])
  
  // Function For Signup
  const signupUserWithEmailAndPassword = (email,password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email,password)
  } 
  
  // Function for sigIn
  const signinUserWithEmailAndPassword = (email,password) => {
    return signInWithEmailAndPassword(firebaseAuth,email, password)
  }

  // Function For SignIn With Google
  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider)
  }

  const isLoggedIn = user ? true : false

  return (
    <FirebaseContext.Provider 
      value={{ 
        signupUserWithEmailAndPassword, 
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn 
      }}>
        
        {props.children}

    </FirebaseContext.Provider>
  )
}