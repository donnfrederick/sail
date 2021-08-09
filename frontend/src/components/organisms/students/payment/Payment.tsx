import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from 'components/molecules/students/CheckoutForm'
import { localStorage as localStorageConstants } from 'constants/index'
import * as React from 'react'
import styled from 'styled-components'

const stripePublicKey =
  localStorage.getItem(localStorageConstants.STRIPE_PUBLIC_KEY) || ''
const stripePromise = loadStripe(stripePublicKey)

export default () => {
  return (
    <Container>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 64px;
  text-align: center;
`
