import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../fireBase'

const auth = getAuth(app);

function SignIn() {
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const SignIn = () => {
        signInWithEmailAndPassword(auth, email,password)
            .then(() => console.log("SignIn Success"))
            .catch((error) => console.log(error))
    }
  
    return (

     <div className='signin-page'>
        <h1>SignIn</h1>
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
            placeholder='Enter Your Password here' 
            required
        />
        <button onClick={SignIn}>Sign In</button>
    </div>
  )
}

export default SignIn
