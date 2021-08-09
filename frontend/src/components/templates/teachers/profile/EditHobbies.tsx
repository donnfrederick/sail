import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditHobbies from 'components/organisms/teachers/edit_hobbies'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'新しく興味が湧いたことを\n3つまで選んでください'}
        marginBottom={72}
      />
      <EditHobbies />
      <EditPageButtons type="hobbies" />
      <Header hasSupport={true} text="興味があることを変更" backToHome={true} />
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
