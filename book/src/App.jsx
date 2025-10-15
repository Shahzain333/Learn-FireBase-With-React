import './App.css'
//import { getDatabase, ref, set } from 'firebase/database'
import { app } from './fireBase'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useState } from 'react';
import { useEffect } from 'react';
import { use } from 'react';

//const db = getDatabase(app);

// for AUthentication
const auth = getAuth(app);

function App() {
  
  // const signUpUser = () => {
  //   createUserWithEmailAndPassword(
  //     auth, 
  //     'shahzainkhannaizi1234@gmail.com', 
  //     'shah@123').then((value) => console.log(value))
  // }

  // const putData = () => {
  //   set(ref(db, 'users/shah'), {
  //     id: 1,
  //     name: "Shah",
  //     age: 21
  //   })
  // }

  const [user,setUser] = useState(null);

  useEffect(() => (
    onAuthStateChanged(auth, (user) => {
      if(user){
        // Yes You Are Logged In
        setUser(user)
      }else {
        // User is logged Out
        console.log("You Are Logout!");
        setUser(null);
      }
    })
  ), [])

  if(user === null){
    return (
    <>
      <div className='App'>
        <SignUp/>
        <SignIn/>
      </div>
    </>
  )
  }

  return (
    <>
      {/* <h1>Firebase React App</h1> */}
      {/* <button onClick={putData}>Put Data</button> */}
      {/* <button onClick={signUpUser}>Create User</button> */}
      {/* <SignUp/>
      <SignIn/> */}
      <div className='App'>
        <h1>Hello {user.email}</h1>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </>
  )
}

export default App
