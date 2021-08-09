import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  icon: string
  link: string
  onClick?(): void
}

export default (props: Props) => {
  const { icon, link, onClick } = props
  return <StyledLink to={link} icon={icon} onClick={onClick} />
}

const StyledLink = styled<Props, any>(Link)`
  display: block;
  width: 100px;
  height: 100px;
  margin-right: 92px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${props => props.icon});
`
