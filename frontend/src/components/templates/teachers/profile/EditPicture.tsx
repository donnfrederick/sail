import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import EditPicture from 'components/organisms/teachers/edit_picture'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'新しい顔写真を登録してください'}
        marginBottom={124}
      />
      <EditPicture />
      <EditPageButtons type="picture" />
      <Header hasSupport={true} text="顔写真を変更" backToHome={true} />
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
