import Footer from 'components/molecules/students/Footer'
import EditPassword from 'components/organisms/students/edit_password'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPassword />
      <Header text="Change Password" hasBackButton={true} />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 360px 0;
`
