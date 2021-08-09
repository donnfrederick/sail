import Header from 'components/molecules/teachers/Header'
import RequestUserDetail from 'components/organisms/teachers/request_user_detail'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <RequestUserDetail />
      <Header
        hasSupport={true}
        text="リクエストした学生詳細"
        backToHome={true}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 96px;
`
