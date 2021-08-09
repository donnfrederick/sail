import { history } from 'components/organisms/Router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Button from 'components/atoms/students/Button'
import CardSection from 'components/atoms/students/CardSection'
import PackageSection from 'components/atoms/students/PackageSection'
import { localStorage as localStorageConstants } from 'constants/index'
import React, { useState } from 'react'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import resolvePath from 'utils/resolvePath'

export default () => {
  const stripe = useStripe()
  const elements = useElements()
  const authToken = getAuthToken() || ''

  const [texts, setTexts] = useState('')
  const [isLoading, setisLoading] = useState(false)

  function stripeTokenHandler(token: any, packageId: string) {
    const paymentData = { token: token.id, package: packageId }

    try {
      fetch(resolvePath.api('issues'), {
        body: JSON.stringify(paymentData),
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            history.push('/students/profile')
          } else {
            setTexts(data.msg)
          }
          setisLoading(false)
        })
    } catch (error) {
      setTexts(error)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setisLoading(true)
    if (!stripe || !elements) {
      setisLoading(false)
      return
    }

    const card = elements.getElement(CardElement)
    if (card) {
      const result = await stripe.createToken(card)

      if (result.error) {
        setTexts(result.error.message as string)
      } else {
        stripeTokenHandler(
          result.token,
          localStorage.getItem(localStorageConstants.PACKAGE_ID) || '290'
        )
      }
    }
  }

  return (
    <div>
      <PackageSection />
      <CardSection />
      <ButtonContainer>
        <Button
          type="blue"
          text="Confirm order"
          isActive={!!stripe && !isLoading}
          onClick={event => {
            try {
              handleSubmit(event)
            } catch (error) {
              setTexts(error)
            }
          }}
        />
        <Text>{texts}</Text>
      </ButtonContainer>
    </div>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  right: 0;
  left: 0;
  margin-top: 50px
  bottom: 156px;
`

const Text = styled.div`
  padding-top: 12px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: #dc3545;
  white-space: pre-wrap;
  text-align: left;

  &:first-line {
    line-height: 1.25;
  }
`
