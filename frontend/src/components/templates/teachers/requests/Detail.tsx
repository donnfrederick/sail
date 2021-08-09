import Header from 'components/molecules/teachers/Header'
import RequestDetail from 'components/organisms/teachers/request_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <RequestDetail />
      <Header hasSupport={true} text="リクエスト詳細" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 160px;
`
