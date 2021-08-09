import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props
  return <Container>{text}</Container>
}

const Container = styled.div`
  display: inline-block;
  margin-bottom: 72px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: left;
  line-height: 1.5;
  color: #405766;
  white-space: pre-wrap;
`
