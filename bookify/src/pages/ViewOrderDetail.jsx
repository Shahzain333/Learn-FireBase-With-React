import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// Import useFirebae from Context
import { useFirebase } from '../context/firebase';

function ViewOrderDetail() {
    
    const [orders,setOrders] = useState([]);
    const params = useParams();
    //console.log("Order Detail Params:", params);

    const firebase = useFirebase();

    useEffect(() => {
        firebase.getOrders(params.bookId)?.then((orders) => {
            //console.log("Order Details:", orders.docs);
            return setOrders(orders.docs);
        })  
    }, [firebase, params.bookId])

  return (
    <div className='container mt-3'>
      <h1>Order Details</h1>
      {
        orders.map((order) => {
            // <div key={order.id} className="card mb-3">
            //   <div className="card-body">
            //     <h5 className="card-title">Order ID: {order.id}</h5>
            //     <p className="card-text">Buyer Name: {order.data().buyerName}</p>
            //     <p className="card-text">Buyer Email: {order.data().buyerEmail}</p>
            //     <p className="card-text">Quantity: {order.data().quantity}</p>
            //     <p className="card-text">Total Price: ${order.data().totalPrice}</p>
            //     </div>
            // </div>
            const orderData = order.data();
            return (
                <div key={order.id} className='mt-5' style={{border: '1px solid', padding: "10px"}}>
                    <h3>Order By: {orderData.displayName}</h3>
                    <h6>Quantity: {orderData.quantity}</h6>
                    <p>Buyer Email: {orderData.userEmail}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default ViewOrderDetail
