import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../fireBase'

const auth = getAuth(app)
// For google SignIn
const googleProvider = new GoogleAuthProvider();

function SignUp() {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then((value) => alert("Success"));
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(() => console.log())
    }

  return (
    <div className='signup-page'>
        <h1>SignUp</h1>
        <label>Email</label>
        <input 
            type='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter Your Email here' 
            required
        />
        <label>Password</label>
        <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter Your password here' 
            required
        />
        <br/>
        <button onClick={signUpWithGoogle}>SignIn With Google</button>
        <button onClick={createUser}>Sign Up</button>
    </div>
  )
}

export default SignUp
