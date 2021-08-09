import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  text: string
  isDisabled?: boolean
  isSelected: boolean
  width?: number
  height?: number
  marginBottom?: number
  backgroundColor?: string
  color?: string
  fontSize?: number
  link?: string
  withBorder?: boolean
  onClick?: (event: any) => void
}

export default ({
  text,
  isDisabled = false,
  isSelected,
  width = 640,
  height = 100,
  backgroundColor = 'transparent',
  color = '#138efd',
  fontSize = 36,
  marginBottom,
  link,
  withBorder = false,
  onClick
}: Props) => {
  return (
    <Button
      data-disabled={isDisabled}
      data-selected={isSelected}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      marginBottom={marginBottom}
      withBorder={withBorder}
      onClick={onClick}
    >
      {link ? <StyledLink to={link}>{text}</StyledLink> : text}
    </Button>
  )
}

const Button = styled<Props, any>('button')`
  appearance: none;
  outline: none;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  box-sizing: border-box;
  margin-bottom: ${props => props.marginBottom}px;
  padding: 0;
  border: ${props => (props.withBorder ? '4px solid #138efd' : 'none')};
  border-radius: ${props => (props.height ? props.height / 2 : 0)}px;
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize}px;
  font-weight: 500;
  line-height: ${props =>
    props.withBorder ? (props.height ? props.height - 8 : 92) : props.height}px;
  letter-spacing: 0px;
  text-align: center;
  color: ${props => props.color};

  &[data-selected='true'] {
    border: none;
    background-image: linear-gradient(279deg, #2eb1ff, #138efd);
    color: #ffffff;
  }

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.4;
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
`
