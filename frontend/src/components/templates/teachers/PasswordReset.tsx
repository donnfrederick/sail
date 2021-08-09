import Header from 'components/molecules/teachers/Header'
import PasswordReset from 'components/organisms/teachers/password_reset'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <PasswordReset />
      <Header text="パスワードの再設定" backToTop={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 240px 80px 0;
`
