import * as React from 'react'
import styled from 'styled-components'

type JSXText = () => JSX.Element

interface Props {
  text: JSXText | string
}

export default ({ text }: Props) => {
  const content = typeof text === 'string' ? text : text()
  return <Heading>{content}</Heading>
}

const Heading = styled.h2`
  height: 94px;
  margin: 0 0 64px;
  padding: 0;
  font-size: 36px;
  font-weight: 500;
  white-space: pre-wrap;
  line-height: 1.33;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`
