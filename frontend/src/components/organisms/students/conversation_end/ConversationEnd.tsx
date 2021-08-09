import Evaluation from 'components/organisms/students/evaluation'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Evaluation type="progress" />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 1334px;
  max-height: 1334px;
  box-sizing: border-box;
  background-image: linear-gradient(328deg, #2eb1ff, #138efd);
`
