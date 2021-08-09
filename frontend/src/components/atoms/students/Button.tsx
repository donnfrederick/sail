import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export type ButtonType = 'white' | 'blue' | 'red' | 'green'

interface Props {
  isActive?: boolean
  fontSize?: number
  height?: number
  link?: string
  marginBottom?: number
  noShadow?: boolean
  text: string | React.ReactNode
  type?: ButtonType
  width?: number
  onClick?: (event: any) => void
}

export default (props: Props) => {
  const {
    isActive = true,
    fontSize = 32,
    height = 88,
    link,
    marginBottom = 0,
    noShadow = false,
    text,
    type = 'blue',
    width = 488,
    onClick
  } = props
  return (
    <Button
      data-active={isActive}
      fontSize={fontSize}
      height={height}
      marginBottom={marginBottom}
      noShadow={noShadow}
      type={type}
      width={width}
      onClick={onClick}
    >
      {link ? <StyledLink to={link}>{text}</StyledLink> : text}
    </Button>
  )
}

const Button = styled<Props, any>('button')`
  appearance: none;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: ${props => props.marginBottom}px;
  padding: 0px;
  outline: none;
  border: none;
  border-radius: ${props => (props.height ? props.height / 2 : 44)}px;
  background-image: ${props =>
    props.type === 'blue'
      ? 'linear-gradient(280deg, #2eb1ff, #138efd)'
      : props.type === 'green'
        ? 'linear-gradient(100deg, #35d46a, #33d489)'
        : props.type === 'red'
          ? 'linear-gradient(110deg, #ff6169, #ff6e7a)'
          : props.type === 'white'
            ? 'linear-gradient(110deg, #ffffff, #ffffff)'
            : null};
  box-shadow: ${props =>
    props.noShadow ? 'none' : '0 2px 20px -6px rgba(5, 68, 102, 0.43)'};
  font-size: ${props => props.fontSize}px;
  font-weight: 500;
  line-height: ${props => props.height}px;
  text-align: center;
  color: ${props => (props.type === 'white' ? '#138efd' : '#ffffff')};

  &[data-active='false'] {
    pointer-events: none;
    background-image: linear-gradient(0deg, #cccfd9, #cccfd9);
    color: #ffffff;
    box-shadow: none;
  }

  &:active {
    background-image: ${props =>
      props.type === 'blue'
        ? 'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(280deg, #2eb1ff, #138efd)'
        : props.type === 'green'
          ? 'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(100deg, #35d46a, #33d489)'
          : props.type === 'red'
            ? 'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(110deg, #ff6169, #ff6e7a)'
            : props.type === 'white'
              ? 'linear-gradient(110deg, #dceeff, #dceeff)'
              : null};
  }
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: inherit;
`
