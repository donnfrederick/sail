import Button from 'components/atoms/teachers/Button'
import Header from 'components/molecules/teachers/Header'
import ProfileEdit from 'components/organisms/teachers/profile_edit'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export default clearInfo(() => {
  return (
    <Container>
      <Title>変更したい項目を選んでください</Title>
      <ProfileEdit />
      <Button
        type="blue"
        text="完了"
        width={384}
        height={112}
        fontSize={40}
        link={resolvePath.page('teachers', 'profile')}
      />
      <Header hasSupport={true} text="自分の情報" backToHome={true} />
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  padding: 192px 0 56px;
  text-align: center;
`

const Title = styled.h2`
  margin: 0 0 72px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #405766;
`
