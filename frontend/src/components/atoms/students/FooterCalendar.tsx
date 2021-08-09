import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'

interface Props {
  icon: string
  link: string
}

export default (props: Props) => {
  const { icon, link } = props
  return <StyledLink to={link} icon={icon} />
}

const StyledLink = styled<Props, any>(Link)`
  display: block;
  position: absolute;
  right: 32px;
  bottom: 16px;
  width: 112px;
  height: 112px;
  border-radius: 56px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 4px 10px 0 rgba(5, 68, 102, 0.2)'};
  background-color: #138efd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 44px 44px;
  background-image: url(${props => props.icon});
`
