import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  fontSize?: string
  text: string
  to: string
  type?: string
}

export default ({ fontSize, text, to, type }: Props) => (
  <TextWrapper fontSize={fontSize} type={type}>
    <Link to={to}>{text}</Link>
  </TextWrapper>
)

interface TextWrapperProps {
  fontSize?: number
  type?: string
}

export const TextWrapper = styled<TextWrapperProps, any>('p')`
  padding: 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 26)}px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0px;
  text-align: center;
  white-space: pre-wrap;
  text-decoration: underline;
  color: ${({ type }) => (type === 'white' ? 'white' : '#405766')};
  & > a {
    color: inherit;
  }
`
