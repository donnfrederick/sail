import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  marginBottom?: number
}

export default (props: Props) => {
  const { text, marginBottom } = props
  return <Title marginBottom={marginBottom}>{text}</Title>
}

const Title = styled<Props, any>('h2')`
  margin: 0 0 ${props => props.marginBottom || 0}px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  color: #405766;
`
