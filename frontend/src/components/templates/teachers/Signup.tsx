import Header from 'components/molecules/teachers/Header'
import SignUp from 'components/organisms/teachers/signup'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'

export default clearInfo(() => {
  return (
    <Container>
      <SignUp />
      <Header text="新規登録" backToTop={true} />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 152px;
  text-align: center;
`
