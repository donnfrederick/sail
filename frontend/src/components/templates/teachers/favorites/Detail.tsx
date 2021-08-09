import * as React from 'react'
import styled from 'styled-components'

import Header from 'components/molecules/teachers/Header.tsx'
import FavoritesDetail from 'components/organisms/teachers/favorites_detail'

export default () => (
  <Container>
    <Header backToHome={true} hasSupport={true} text="お気に入り一覧" />
    <FavoritesDetail />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: 160px;
`
