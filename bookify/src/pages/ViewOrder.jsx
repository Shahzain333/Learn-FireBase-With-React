import React, { useState } from 'react'
// Import useFirebae from Context
import { useFirebase, isLoggedIn } from '../context/firebase';
// import BookCard
import BookCard from '../components/Card';

function ViewOrder() {
    
    const [books, setBooks] = useState([]);

    const firebase = useFirebase();

    useEffect(() => {
        if(firebase.isLoggedIn){
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => {
                //console.log("Orders:", books.docs[0].data());
                setBooks(books.docs);
            })
        }else {
            <h1>Please Login to View your Orders</h1>
        }
        
    }, [firebase])

    //console.log("Books:", books);

  return (
    <div>
      {
        books.map((book) => (
            <BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
        ))
      }
    </div>
  )
}

export default ViewOrder
