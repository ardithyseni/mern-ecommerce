import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import StripeCheckout from '../components/forms/StripeCheckout';
import '../stripe.css';

// Load stripe outside of components render 
// to avoid recreating stripe object on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentPage = () => {
  return (
    <div className='container p-5 text-center'>
      <h4>Complete your payment</h4>
      <Elements stripe={stripePromise}>
        <div className='col-md-8 offset-md-2'>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  )
}

export default PaymentPage