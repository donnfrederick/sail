import * as React from 'react'
import styled from 'styled-components'

import FavoritesDetail from 'components/organisms/students/favorites_detail'
import Header from 'components/organisms/students/header'

export default () => (
  <Container>
    <Header hasBackButton={true} text="Favorite User's Profile" />
    <FavoritesDetail />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  padding: 140px 40px 0;
  box-sizing: border-box;
`
