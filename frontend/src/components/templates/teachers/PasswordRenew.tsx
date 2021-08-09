import Header from 'components/molecules/teachers/Header'
import PasswordRenew from 'components/organisms/teachers/password_renew'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <PasswordRenew />
      <Header text="パスワードの再設定" />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 240px 0 0;
`
