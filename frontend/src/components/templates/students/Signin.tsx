import Header from 'components/organisms/students/header'
import Signin from 'components/organisms/students/signin'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default clearInfo(() => {
  return (
    <Container>
      <Img src={resolvePath.image('common/students@3x.png')} />
      <Signin />
      <Header text="Sign in to Sail" hasBackButton={true} theme="white" />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 196px;
  text-align: center;
`

const Img = styled.img`
  width: 324px;
  height: 324px;
  margin-bottom: 72px;
`
