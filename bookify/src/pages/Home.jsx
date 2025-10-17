import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase';
import BookCard from '../components/Card';
// For CSS
import CardGroup from 'react-bootstrap/CardGroup';

function Home() {
    
    const [books,setBooks] = useState([])
    const firebase = useFirebase();

    useEffect(() => {
       //firebase.getListAllBooks().then(docs => console.log("Books List:", docs.docs[0]));
       firebase.getListAllBooks().then((books) => {
            return setBooks(books.docs)
       })
    }, [])

  return (
    <div className='container mt-5'>
        {/* <h1 className='mt-5'>Welcome to Bookify</h1> */}
        <CardGroup>
            {books.map((book) => (
            // <li>{book.data().name}</li>
            <BookCard key={book.id} id={book.id} {...book.data()} />
        ))}
        </CardGroup>
        
    </div>
  )
}

export default Home
