import BlockedListDetail from 'components/organisms/students/blocked_list_detail'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <BlockedListDetail />
      <Header text="Blocked Account Detail" hasBackButton={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 140px 40px;
  text-align: center;
`
