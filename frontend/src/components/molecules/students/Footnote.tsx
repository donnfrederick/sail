import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Small>
      By tapping Continue, Create Account, Sign in, you agree to Sail's{' '}
      <StyledLink to={resolvePath.page('students', 'terms')}>
        Terms and Conditions of Use
      </StyledLink>{' '}
      and{' '}
      <StyledLink to={resolvePath.page('students', 'privacy')}>
        Privacy Policy
      </StyledLink>.
    </Small>
  )
}

const Small = styled.small`
  display: block;
  width: 554px;
  margin: 0 auto;
  font-size: 24px;
  line-height: 1.5;
  text-align: left;
  color: #8394a0;
`

const StyledLink = styled(Link)`
  font-weight: 500;
  color: #405766;
`
