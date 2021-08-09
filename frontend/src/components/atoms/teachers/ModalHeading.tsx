import * as React from 'react'
import styled from 'styled-components'

interface Props {
  isError?: boolean
  text: string
}

export default (props: Props) => {
  const { isError, text } = props

  return <Heading isError={isError}>{text}</Heading>
}

const Heading = styled<Props, any>('div')`
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  color: ${props => (props.isError ? '#ff676e' : '#405766')};
`
