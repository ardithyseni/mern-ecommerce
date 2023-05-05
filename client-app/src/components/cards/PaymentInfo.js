import React from 'react'

const PaymentInfo = ({ order }) => {
    return (
        <div>
            <p>Order ID: <b>{order.paymentIntent.id}</b></p>
            <p className='mb-3'>Payment: <span className='badge badge-success'>{order.paymentIntent.status}</span></p>
            <h6>Amount: {(order.paymentIntent.amount  /= 100).toLocaleString("en-DE", { style: "currency", currency: "EUR" })}</h6>
            <h6>Order Status: <span className='badge badge-info'>{order.orderStatus}</span></h6>
        </div>
    )
}

export default PaymentInfo