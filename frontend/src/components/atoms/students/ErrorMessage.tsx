import * as React from 'react'
import styled from 'styled-components'

interface Props {
  message: string
}

export default (props: Props) => {
  const { message } = props

  return <ErrorMessage>{message}</ErrorMessage>
}

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -42px;
  left: 0;
  font-size: 24px;
  font-weight: 500;
  color: #fa6970;
`
