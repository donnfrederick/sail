import Signin from 'components/organisms/teachers/signin'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'

export default clearInfo(() => {
  return (
    <Container>
      <Heading>ログイン</Heading>
      <Signin />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 48px;
  text-align: center;
`

const Heading = styled.h1`
  margin: 0 0 72px;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  color: #405766;
`
