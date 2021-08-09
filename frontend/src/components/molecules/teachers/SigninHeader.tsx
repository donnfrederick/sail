import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  returnPath?: string
  text: string
}

export default (props: Props) => {
  const { returnPath, text } = props

  return (
    <Container>
      <Text>{text}</Text>
      {returnPath ? <Back to={returnPath} /> : null}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
`

const Text = styled.div`
  position: absolute;
  bottom: 8px;
  right: 0;
  left: 0;
  width: 400px;
  margin: auto;
  font-size: 36px;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`

const Back = styled(Link)`
  position: absolute;
  left: 32px;
  bottom: 8px;
  width: 28px;
  height: 28px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${resolvePath.image('teachers/back@3x.png')});
`
