import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import Requests from 'components/organisms/students/requests'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Requests />
      <Header hasBackButton={true} text="Conversation Requests" />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 96px;
`
