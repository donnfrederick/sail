import Header from 'components/organisms/students/header'
import RequestDetail from 'components/organisms/students/request_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <RequestDetail />
      <Header hasBackButton={true} text="Request Detail" />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 96px;
  text-align: center;
`
