import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import Profile from 'components/organisms/students/profile'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Profile />
      <Header text="My Page" hasBackButton={true} />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
`
