import React, { useState } from 'react'
// Import CSS from bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Import Hook from FireBase
import { useFirebase } from '../context/firebase';

function List() {

    const [name,setName] = useState("")
    const [isbnNumber,setIsbnNumber] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setCoverPic] = useState("")

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventdefault();   
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
    }

  return (
    <div className='container mt-5'>
        
        <Form onSubmit={handleSubmit}>
           
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter Book Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIBnNumber">
                <Form.Label>ISBN</Form.Label>
                <Form.Control 
                    type="text" 
                    value={isbnNumber}
                    onChange={(e) => setIsbnNumber(e.target.value)}
                    placeholder="Enter ISBN"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookPic">
                <Form.Label>Book Pic</Form.Label>
                <Form.Control 
                    type="file" 
                    onChange={(e) => setCoverPic(e.target.files[0])}
                />
            </Form.Group>
        
            <Button variant="primary" type="submit">
                Login
            </Button>
        
        </Form>
    </div>
  )
}

export default List
