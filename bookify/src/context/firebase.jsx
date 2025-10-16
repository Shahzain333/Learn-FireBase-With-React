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
  apiKey: "AIzaSyAB2lierZkdkha9q98jbR1JBg7MmhTyfsk",
  authDomain: "bookify-475da.firebaseapp.com",
  projectId: "bookify-475da",
  storageBucket: "bookify-475da.firebasestorage.app",
  messagingSenderId: "322929803723",
  appId: "1:322929803723:web:1e17a7236231b37e26364e"
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