import Header from 'components/molecules/teachers/Header'
import Profile from 'components/organisms/teachers/profile'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Profile />
      <Header hasSupport={true} text="自分の情報" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 160px;
  text-align: center;
`
