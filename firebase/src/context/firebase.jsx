import { createContext, useContext } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// For Real Time database
import { getDatabase, set, ref, get, child, onValue } from 'firebase/database'
import { useState } from "react";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: "https://app-bc6b7-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig)
//const firebaseAuth = getAuth(firebaseApp)
// For Real Time Database
const database = getDatabase(firebaseApp)

const FirebaseContext = createContext(null)

export const useFireBase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

    const [name, setName] = useState('')

    const signupUserWithEmailAndpassword = (emai, password) => {
        return createUserWithEmailAndPassword(firebaseAuth,emai,password)
    }

    const putData = (key, data) => {
        set(ref(database,key), data)
    }

    // get(child(ref(database), 'grandFather/Father/child')).then((snapshot) => {
    //     console.log(snapshot.val());
    // })

    useEffect(() => {
        onValue(ref(database, 'grandFather/Father/child'), (snapshot) => 
            //console.log(snapshot.val())
            setName(snapshot.val().name)
        )
    },[])
    

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndpassword , putData}}>
            <h3>Name is {name}</h3>
            {props.children}
        </FirebaseContext.Provider>
    )
}








