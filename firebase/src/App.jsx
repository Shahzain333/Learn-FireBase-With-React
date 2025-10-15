import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFireBase } from './context/firebase'

function App() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const firebase = useFireBase()
  //console.log("FireBase", firebase);

  return (
    <>
      <h1>Firebase</h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter Password'
      />
      <button onClick={() => {
        firebase.signupUserWithEmailAndpassword(email,password);
        //firebase.putData("users/" + "shahzain", { email, password} );
      }}>
          Sign Up
      </button>
    </>
  )
}

export default App
