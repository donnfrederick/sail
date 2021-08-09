import * as React from 'react'
import styled from 'styled-components'

import Favorites from 'components/organisms/students/favorites'
import Header from 'components/organisms/students/header'

export default () => (
  <Container>
    <Header hasBackButton={true} text="Favorites" />
    <Favorites />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 108px 0 192px;
  box-sizing: border-box;
`
