import { localStorage as localStorageConstants } from 'constants/index'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  const price = localStorage.getItem(localStorageConstants.PACKAGE_PRICE)
  return (
    <Container>
      <Card>
        <Header>Monthly Subscription</Header>
        <Price>${price}/mo</Price>
        <Detail>Unlimited Conversations</Detail>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 80px;
  text-align: center;
`
const Card = styled.div`
  padding: 30px
  box-shadow: 2px 2px 4px;
  background-color: #ffffff;
  border-radius: 40px;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 40px;
`
const Price = styled.div`
  font-weight: bold;
  font-size: 64px;
  color: #dc3545;
  margin-bottom: 40px;
`
const Detail = styled.div`
  font-size: 36px;
`
