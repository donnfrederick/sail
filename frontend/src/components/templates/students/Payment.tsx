import Header from 'components/organisms/students/header'
import PostIssue from 'components/organisms/students/payment'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Header text="Payment" hasBackButton={true} />
      <PostIssue />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 64px;
  text-align: center;
`
