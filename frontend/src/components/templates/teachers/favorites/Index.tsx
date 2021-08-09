import * as React from 'react'
import styled from 'styled-components'

import Header from 'components/molecules/teachers/Header.tsx'
import Favorites from 'components/organisms/teachers/favorites'

export default () => (
  <Container>
    <Header backToHome={true} hasSupport={true} text="お気に入り一覧" />
    <Favorites />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 160px 0 192px;
  box-sizing: border-box;
`
