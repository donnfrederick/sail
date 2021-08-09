import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props

  return <Text>{text}</Text>
}

const Text = styled.p`
  margin-bottom: 64px;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`
