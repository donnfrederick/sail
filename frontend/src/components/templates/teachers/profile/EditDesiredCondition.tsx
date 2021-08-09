import EditPageTitle from 'components/atoms/teachers/EditPageTitle'
import Header from 'components/molecules/teachers/Header'
import EditDesiredCondition from 'components/organisms/teachers/edit_desired_condition'
import EditPageButtons from 'components/organisms/teachers/edit_page_buttons'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <EditPageTitle
        text={'新しい希望条件を\n選んでください'}
        marginBottom={180}
      />
      <EditDesiredCondition />
      <EditPageButtons type="desired_condition" />
      <Header
        hasSupport={true}
        text="学生への希望条件を変更"
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
