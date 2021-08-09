import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export type ButtonType = 'white' | 'blue' | 'red' | 'green'

interface Props {
  isActive?: boolean
  type: ButtonType
  width?: number
  height?: number
  marginBottom?: number
  noShadow?: boolean
  fontSize?: number
  text: string | JSX.Element
  onClick?: (event: any) => void
  link?: string
}

export default function Button(props: Props) {
  const {
    isActive = true,
    type,
    width = 304,
    height = 112,
    fontSize = 40,
    marginBottom = 0,
    noShadow = false,
    text,
    onClick,
    link
  } = props

  return isWhiteButton(type) ? (
    <WhiteButton
      width={width}
      height={height}
      marginBottom={marginBottom}
      noShadow={noShadow}
      fontSize={fontSize}
      onClick={onClick}
      data-active={isActive}
    >
      {link ? (
        <StyledLink to={link}>{text}</StyledLink>
      ) : (
        <TextWrap>{text}</TextWrap>
      )}
    </WhiteButton>
  ) : isBlueButton(type) ? (
    <BlueButton
      width={width}
      height={height}
      marginBottom={marginBottom}
      noShadow={noShadow}
      fontSize={fontSize}
      onClick={onClick}
      data-active={isActive}
    >
      {link ? (
        <StyledLink to={link}>{text}</StyledLink>
      ) : (
        <TextWrap>{text}</TextWrap>
      )}
    </BlueButton>
  ) : isRedButton(type) ? (
    <RedButton
      width={width}
      height={height}
      marginBottom={marginBottom}
      noShadow={noShadow}
      fontSize={fontSize}
      onClick={onClick}
      data-active={isActive}
    >
      {link ? (
        <StyledLink to={link}>{text}</StyledLink>
      ) : (
        <TextWrap>{text}</TextWrap>
      )}
    </RedButton>
  ) : isGreenButton(type) ? (
    <GreenButton
      width={width}
      height={height}
      marginBottom={marginBottom}
      noShadow={noShadow}
      fontSize={fontSize}
      onClick={onClick}
      data-active={isActive}
    >
      {link ? (
        <StyledLink to={link}>{text}</StyledLink>
      ) : (
        <TextWrap>{text}</TextWrap>
      )}
    </GreenButton>
  ) : null
}

const isWhiteButton = (type: ButtonType) => type === 'white'
const isBlueButton = (type: ButtonType) => type === 'blue'
const isRedButton = (type: ButtonType) => type === 'red'
const isGreenButton = (type: ButtonType) => type === 'green'

const buttonStyle = (
  defaultBackground: string,
  boxShadowColor: string,
  textColor: string,
  activeBackground: string
) => css<Props>`
  appearance: none;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: ${props => props.marginBottom}px;
  padding: 0px;
  outline: none;
  border: none;
  border-radius: ${props => (props.height ? props.height / 2 : 0)}px;
  ${defaultBackground}
  box-shadow: ${props =>
    props.noShadow ? 'none' : `0 5px 25px -10px ${boxShadowColor}`};
  font-size: ${props => props.fontSize}px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: ${textColor};

  &[data-active='false'] {
    pointer-events: none;
    opacity: 0.4;
    box-shadow: none;
  }

  &:active {
    ${activeBackground}
  }
`

const WhiteButton = styled<Props, any>('button')`
  ${buttonStyle(
    'background-color: #ffffff;',
    'rgba(5, 68, 102, 0.35)',
    '#138efd',
    'background-color: #dceeff;'
  )};
`

const BlueButton = styled<Props, any>('button')`
  ${buttonStyle(
    'background-image: linear-gradient(282deg, #2eb1ff, #138efd);',
    'rgba(6, 85, 128, 0.75)',
    '#ffffff',
    'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(292deg, #2eb1ff, #138efd);'
  )};
`
const RedButton = styled<Props, any>('button')`
  ${buttonStyle(
    'background-image: linear-gradient(112deg, #ff6169, #ff6e7a);',
    'rgba(6, 85, 128, 0.75)',
    '#ffffff',
    'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(112deg, #ff6169, #ff6e7a);'
  )};
`

const GreenButton = styled<Props, any>('button')`
  ${buttonStyle(
    'background-image: linear-gradient(106deg, #35d46a, #33d489);',
    'rgba(6, 85, 128, 0.75)',
    '#ffffff',
    'background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(106deg, #35d46a, #33d489);'
  )};
`

const textWrapStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: inherit;
  white-space: pre-wrap;
  line-height: 1.3;
`

const StyledLink = styled(Link)`
  ${textWrapStyle};
`

const TextWrap = styled.div`
  ${textWrapStyle};
`
