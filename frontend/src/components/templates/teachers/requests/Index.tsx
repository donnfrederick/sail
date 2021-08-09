import Header from 'components/molecules/teachers/Header'
import Requests from 'components/organisms/teachers/requests'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Requests />
      <Header hasSupport={true} text="予約リクエスト一覧" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 160px;
`
