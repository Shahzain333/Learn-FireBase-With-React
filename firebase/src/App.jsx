import { useState } from 'react'
import './App.css'
import { useFireBase } from './context/firebase'

function App() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const firebase = useFireBase()
  //console.log("FireBase", firebase);

  const putDataNew = async () => {
    //firebase.putData('root/a/b',{ id: 1 })
    firebase.putData('grandFather/Father/child', { 
      id: 1,
      name: "Ali",
      age: 21 
    })
  }

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
      <button onClick={putDataNew}>Triggere here</button>
    </>
  )
}

export default App
