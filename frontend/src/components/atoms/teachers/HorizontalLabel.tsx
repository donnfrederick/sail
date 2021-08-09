import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  width?: number
}

export default (props: Props) => {
  const { text, width = 656 } = props
  return (
    <Container width={width}>
      <Line />
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled<Props, any>('div')`
  position: relative;
  width: ${props => props.width}px;
  height: 32px;
  margin: 0 auto 32px;
`

const Line = styled.hr`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  margin: auto;
  border: none;
  background-color: #138efd;
`

const Text = styled.span`
  position: relative;
  padding: 0 20px;
  background-color: #f6f7fb;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
`
