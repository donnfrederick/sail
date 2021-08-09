import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <StyledLink to={resolvePath.page('teachers', 'organizations/signin')}>
      施設担当者様はこちら
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  display: block;
  width: 547px;
  height: 47px;
  margin: 0 auto 88px;
  font-size: 32px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  text-decoration: underline;
  text-align: center;
  color: #405766;
`
