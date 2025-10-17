import React from 'react'
import { useParams } from 'react-router-dom';

function BookDetails() {

  const bookId = useParams();
  
  return (
    <div>
      Book Details here
    </div>
  )
}

export default BookDetails
