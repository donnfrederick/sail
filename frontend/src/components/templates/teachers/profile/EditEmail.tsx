import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditEmail from 'components/organisms/teachers/edit_email'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <Header hasSupport={true} text="メールアドレスを変更" backToHome={true} />
      <EditPageTitle
        text={'新しいメールアドレスを\n入力してください'}
        marginBottom={200}
      />
      <EditEmail />
      <EditPageButtons type="email" />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 192px 0 56px;
  text-align: center;
`
