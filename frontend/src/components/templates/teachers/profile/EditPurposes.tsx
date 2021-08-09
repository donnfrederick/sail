import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import EditPurposes from 'components/organisms/teachers/edit_purposes'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'新しい利用目的を\n選んでください (複数回答可)'}
        marginBottom={102}
      />
      <EditPurposes />
      <EditPageButtons type="purposes" />
      <Header hasSupport={true} text="利用目的を変更" backToHome={true} />
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
