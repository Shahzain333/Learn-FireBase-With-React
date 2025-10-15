import { createContext, useContext } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// For Real Time database
import { getDatabase, set, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: "https://app-bc6b7-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
// For Real Time Database
const database = getDatabase(firebaseApp)

const FirebaseContext = createContext(null)

export const useFireBase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

    const signupUserWithEmailAndpassword = (emai, password) => {
        return createUserWithEmailAndPassword(firebaseAuth,emai,password)
    }

    const putData = (key, data) => {
        set(ref(database,key), data)
    }

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndpassword , putData}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}








