import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Import useFirebase from Context
import { useFirebase } from '../context/firebase';
// Import react router Dom
import { useNavigate } from 'react-router-dom'

function Register() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();

    const firebase = useFirebase();
    //console.log(firebase)

    useEffect(() => {
        if(firebase.isLoggedIn){
            // Navigate To home
            navigate('/login')
        }
    }, [firebase, navigate])

    const createAccount = async (e) => {
        e.preventDefault();
        console.log("Signin up a user.....")
        const result = await firebase.signupUserWithEmailAndPassword(email,password)
        console.log("Successfull", result)
    }

  return (
    <div className='container mt-5'>
      <Form onSubmit={createAccount}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email"
            />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Create Account
        </Button>
    </Form>
    </div>
  )
}

export default Register
