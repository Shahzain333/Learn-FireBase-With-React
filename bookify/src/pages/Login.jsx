import React, { useEffect, useState } from 'react'
// Import CSS from bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Import useFirebase from Context
import { useFirebase } from '../context/firebase';
// Import react router Dom
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();

    const firebase = useFirebase();
    //console.log(firebase)

    useEffect(() => {
        
        if(firebase.isLoggedIn){
            // Navigate To home
            navigate('/')
        }

    }, [firebase,navigate])

    const loginAccount = async (e) => {
        e.preventDefault();
        console.log("Login User....")
        const result = await firebase.signinUserWithEmailAndPassword(email,password)
        console.log("Successfull login", result)
    }

  return (
    <div className='container mt-5'>
        <Form onSubmit={loginAccount}>
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
                Login
            </Button>
        </Form>
        <h1 className='mt-2 mb-2'>OR</h1>
        <Button onClick={firebase.signinWithGoogle} variant='danger'>SignIn With Google</Button>
    </div>
  )
}

export default Login
