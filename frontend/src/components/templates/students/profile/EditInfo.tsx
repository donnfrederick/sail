import Footer from 'components/molecules/students/Footer'
import EditInfo from 'components/organisms/students/edit_info'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditInfo />
      <Header text="Edit Profile" hasBackButton={true} />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 128px 0 276px;
`
