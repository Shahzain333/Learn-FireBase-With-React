import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// For Css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Import useFirebase from Context
import { useFirebase } from '../context/firebase';

function BookDetails() {

  const [data,setData] = useState(null)
  const [url,setURL] = useState(null)
  const [quantity,setQuantity] = useState(1)

  const params = useParams();
  const firebase = useFirebase();

  //console.log(params);
  //console.log(data);

  useEffect(() => {
    // firebase.getBooksById(params.bookId).then((book) => {
    //   console.log("Book Details:", book.data());
    // });
    firebase.getBooksbyId(params.bookId).then((book) => {
      return setData(book.data());
    })
  }, [])

  useEffect(() => {
    if(data){
      const imageURl = data.imageUrl; 
      firebase.getImageUrl(imageURl).then((url) => setURL(url));
    }
  }, [data])

  if(data === null){
    return <h1>Loading...</h1>
  }

  const placOrders = async () => {
    // await firebase.placeOrder({
    //   bookId: params.bookId,
    //   quantity: quantity,
    //   bookName: data.name,
    //   price: data.price,
    //   userId: firebase.user.uid,
    //   userEmail: firebase.user.email,
    //   ownerId: data.userId,
    // }).then(() => {
    //   alert("Order Placed Successfully!")
    // })
    const result = await firebase.placOrder(params.bookId, quantity)
    //console.log("Order Placed Successfully", result);
    return result
  }

  return (
    <div className='container mt-5'>
      <h1>{data.name}</h1>
      <img src={url} width= "50%" style={{ borderRadius: "10px" }} />
      <h3>Details</h3>
      <p>Price: Rs.{data.price}</p>
      <p>ISBN Number: {data.isbnNumber}</p>
      <h1>Owner Details</h1>
      {/* <img src={data.photoURl} /> */}
      <p>Name : {data.displayName}</p>
      <p>Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicQuantity">
        <Form.Control 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            min="1"
        />
      </Form.Group>
      <Button onClick={placOrders} variant="success">Buy Now</Button>
    </div>
  )
}

export default BookDetails
