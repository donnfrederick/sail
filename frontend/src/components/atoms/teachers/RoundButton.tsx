import * as React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  size?: number
  fontSize?: number
  isSelected?: boolean
  alwaysOn?: boolean
  onClick?: (event: any) => void
}

export default (props: Props) => {
  const {
    text,
    size = 240,
    fontSize = 48,
    isSelected,
    alwaysOn = true,
    onClick
  } = props

  return (
    <Button
      size={size}
      fontSize={fontSize}
      data-selected={isSelected}
      alwaysOn={alwaysOn}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

const Button = styled<Props, any>('button')`
  appearance: none;
  display: block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  box-sizing: border-box;
  padding: 0;
  border: 4px solid #138efd;
  border-radius: 50%;
  outline: none;
  background-color: transparent;
  font-size: ${props => props.fontSize}px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;

  &[data-selected='true'] {
    pointer-events: ${props => (props.alwaysOn ? 'auto' : 'none')};
    border: none;
    background-image: linear-gradient(315deg, #2eb1ff, #138efd);
    color: #ffffff;
  }
`
