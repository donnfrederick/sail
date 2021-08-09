import BlockedList from 'components/organisms/students/blocked_list'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <BlockedList />
      <Header text="Blocked Accounts" hasBackButton={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 120px 32px;
  text-align: center;
`
