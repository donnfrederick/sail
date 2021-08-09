import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Heading>Select the date</Heading>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding-top: 80px;
  text-align: center;
`

const Heading = styled.h2`
  margin: 0 auto 24px;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #405766;
`
