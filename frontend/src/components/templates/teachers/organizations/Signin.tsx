import Signin from 'components/organisms/teachers/signin'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Heading>施設担当者ログイン</Heading>
      <Signin isOrganizations={true} />
    </Container>
  )
}

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
