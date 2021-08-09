import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Container>
      <Heading>{'このブラウザは非対応です'}</Heading>
      <Img src={resolvePath.image('common/maintenance@3x.png')} />
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  padding-top: 128px;
  padding-bottom: 40px;
  text-align: center;
`

const Heading = styled.h1`
  margin: 0 0 165px;
  padding: 0;
  font-family: sans-serif;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`

const Img = styled.img`
  width: 517px;
  height: 499px;
  margin-bottom: 80px;
`
