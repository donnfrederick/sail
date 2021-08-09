import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
}

export default (props: Props) => {
  const { text } = props
  return <Label>{text}</Label>
}

const Label = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: left;
  color: #8394a0;
`
