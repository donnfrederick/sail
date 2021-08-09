import Footnote from 'components/molecules/students/Footnote'
import SigningButtons from 'components/molecules/students/SigningButtons'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Img src={resolvePath.image('common/students@3x.png')} />
      <SigningButtons />
      <Footnote />
      <Header
        theme="white"
        text="For International People"
        hasBackButton={true}
        returnPath={'/'}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 196px;
  text-align: center;
`

const Img = styled.img`
  width: 324px;
  height: 324px;
  margin-bottom: 80px;
`
