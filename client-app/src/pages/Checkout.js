import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../functions/userFunctions';


const Checkout = () => {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({...state}));


  useEffect(() => {
    getUserCart(user.token)
    .then((res) => {
      console.log('user cart response', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);

    });
  }, []);

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
        <h1>{total}</h1>
        {JSON.stringify(products)}
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