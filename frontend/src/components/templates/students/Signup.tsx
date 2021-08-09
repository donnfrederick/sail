import Signup from 'components/organisms/students/signup'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'

export default clearInfo(() => {
  return (
    <Container>
      <Signup />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 128px 0;
  text-align: center;
`
