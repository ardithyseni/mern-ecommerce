import React from 'react'

const PaymentInfo = ({ order }) => {
    return (
        <div>
            <p className='mb-3'>Order ID: {order.paymentIntent.id}</p>
            <h6>Amount: {(order.paymentIntent.amount /= 100).toLocaleString("en-DE", { style: "currency", currency: "EUR" })}</h6>
            <h6>Order Status: <span className='badge badge-info'>{order.orderStatus}</span></h6>
        </div>
    )
}

export default PaymentInfo