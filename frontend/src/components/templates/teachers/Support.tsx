import Button from 'components/atoms/teachers/Button'
import Header from 'components/molecules/teachers/Header'
import { history } from 'components/organisms/Router'
import SupportList from 'components/organisms/teachers/support_list'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <SupportList />
      <Button
        type="white"
        text="戻る"
        width={384}
        height={112}
        onClick={() => history.goBack()}
      />
      <Header text="メニュー" backToHome={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 128px 0;
  text-align: center;
`
