import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default () => {
  return (
    <Small>
      新規会員登録により、私はSailの<StyledLink
        to={resolvePath.page('teachers', 'terms')}
      >
        利用規約
      </StyledLink>、<StyledLink to={resolvePath.page('teachers', 'privacy')}>
        プライバシーポリシー
      </StyledLink>に同意します。
    </Small>
  )
}

const Small = styled.small`
  display: block;
  width: 554px;
  margin: 0 auto;
  font-size: 28px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
  color: #405766;
`

const StyledLink = styled(Link)`
  font-weight: 500;
  color: #138efd;
`
