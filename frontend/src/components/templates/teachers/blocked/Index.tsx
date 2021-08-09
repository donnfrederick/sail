import Header from 'components/molecules/teachers/Header'
import BlockedList from 'components/organisms/teachers/blocked_list'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <BlockedList />
      <Header text="ブロックした世界の人" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 160px 0;
  text-align: center;
`
