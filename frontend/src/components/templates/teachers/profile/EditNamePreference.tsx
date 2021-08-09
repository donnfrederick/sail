import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditNamePreference from 'components/organisms/teachers/edit_name_preference'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'どうやってお呼びしたらいいでしょうか？'}
        marginBottom={152}
      />
      <EditNamePreference />
      <EditPageButtons type="preferred_name" />
      <Header
        hasSupport={true}
        text="ディスプレイネームを変更"
        backToHome={true}
      />
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
