import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
// Import hooks from firebase
import { useFirebase } from '../context/firebase';

function BookCard(props) {

    const [url,setURL] = useState("")
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("Book Card Props:", props);
        firebase.getImageUrl(props.imageUrl).then(url => setURL(url) )
    }, [])

    //console.log(props)

  return (
    
    <Card style={{ width: '18rem', margin: '25px' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
            This Book has a title {props.name} and this books is sold by {props.displayName}
            and this book costs Rs. {props.price}
            </Card.Text>
            <Button onClick={(e) => navigate(props.link)} variant="primary">View</Button>
        </Card.Body>
    </Card>
  )
}

export default BookCard
