import { CardElement } from '@stripe/react-stripe-js'
import React from 'react'
// import './Styles.css'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      '::placeholder': {
        color: '#aab7c4'
      },
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '24px',
      fontSmoothing: 'antialiased'
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}
function CardSection() {
  return (
    <label>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}
export default CardSection
