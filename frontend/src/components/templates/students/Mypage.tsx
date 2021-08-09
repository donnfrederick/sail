import Footer from 'components/molecules/students/Footer'
import Header from 'components/organisms/students/header'
import Mypageinfo from 'components/organisms/students/mypageInfo'
import connectWebSocket from 'hocs/connectWebSocket'
import * as React from 'react'
import styled from 'styled-components'

export default connectWebSocket(() => {
  return (
    <Container>
      <Mypageinfo />
      <Header text="Home" hasMenu={true} />
      <Footer />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 1334px;
  max-height: 1334px;
  padding: 88px 0 100px;
  box-sizing: border-box;
  text-align: center;
`
