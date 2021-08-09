import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props

  return <Heading>{text}</Heading>
}

const Heading = styled.h2`
  margin: 0 0 32px;
  padding: 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;
`
