import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditGender from 'components/organisms/teachers/edit_gender'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle text={'新しい性別を選んでください'} marginBottom={224} />
      <EditGender />
      <EditPageButtons type="gender" />
      <Header hasSupport={true} text="性別を変更" backToHome={true} />
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
