import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditName from 'components/organisms/teachers/edit_name'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'新しい名前をひらがなで入力してください'}
        marginBottom={152}
      />
      <EditName />
      <EditPageButtons type="name" />
      <Header hasSupport={true} text="名前を変更" backToHome={true} />
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
