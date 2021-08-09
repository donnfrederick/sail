import Header from 'components/molecules/teachers/Header'
import BlockedListDetail from 'components/organisms/teachers/blocked_list_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <BlockedListDetail />
      <Header text="ブロックした世界の人詳細" backToHome={true} />
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
