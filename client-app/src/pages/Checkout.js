import React from 'react'

const Checkout = () => {

  const saveAddressToDb = () => {
    //
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>Save</button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className='col-md-6'>
        Cart Summary

        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Place Order</button>
          </div>
          
          <div className='col-md-6'>
            <button className='btn btn-primary'>Empty Cart</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout