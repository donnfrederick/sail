import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  text: string
  backToHome?: boolean
  backToTop?: boolean
  hasReset?: boolean
  hasSupport?: boolean
}

export default (props: Props) => {
  const { text, backToHome, backToTop, hasSupport } = props
  return (
    <Container>
      <Text>{text}</Text>
      {backToTop ? (
        <BackButton to={resolvePath.page('teachers')}>最初に戻る</BackButton>
      ) : backToHome ? (
        <BackButton to={resolvePath.page('teachers', 'mypage')}>
          ホームに戻る
        </BackButton>
      ) : null}
      {hasSupport ? (
        <HeaderButtonContainer>
          <NotificationButton
            to={resolvePath.page('teachers', 'notifications')}
          />
          <MenuButton to={resolvePath.page('teachers', 'support')} />
        </HeaderButtonContainer>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 128px;
  background-color: #138efd;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 20px 0 rgba(5, 68, 102, 0.2)'};
  z-index: 1000;

  .is-pc & {
    width: 800px;
    right: 0;
    margin: auto;
  }
`

const Text = styled.div`
  height: 32px;
  font-size: 28px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const BackButton = styled(Link)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 24px;
  width: 168px;
  height: 24px;
  margin: auto;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0px;
  text-align: left;
  color: #ffffff;
`

const HeaderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  width: 184px;
  height: 100%;
`

const HeaderButtonStyle = css`
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

const NotificationButton = styled(Link)`
  ${HeaderButtonStyle}
  background-image: url(${resolvePath.image('teachers/header-bell.png')});
`

const MenuButton = styled(Link)`
  ${HeaderButtonStyle}
  background-image: url(${resolvePath.image('teachers/header-menu.png')});
`
