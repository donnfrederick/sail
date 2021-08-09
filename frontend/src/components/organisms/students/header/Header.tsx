import { history } from 'components/organisms/Router'
import CancelConversationModal from 'components/organisms/students/modal_contents/cancel_conversation'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

export type Theme = 'blue' | 'white'

interface Props {
  conversation: ConversationModels.Conversation | null
  hasCancel?: boolean
  text: string
  hasMenu?: boolean
  hasBackButton?: boolean
  returnPath?: string
  theme?: Theme
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default (props: Props) => {
  const {
    conversation,
    hasCancel = false,
    text,
    hasMenu,
    hasBackButton,
    returnPath,
    theme = 'blue',
    openModal,
    setModalContents
  } = props
  return (
    <Container theme={theme}>
      <Text theme={theme}>{text}</Text>
      {hasBackButton ? (
        returnPath ? (
          <ReturnButton to={returnPath} theme={theme} />
        ) : (
          <BackButton onClick={() => history.goBack()} theme={theme} />
        )
      ) : null}
      {hasMenu ? (
        <Menu to={resolvePath.page('students', 'menu')}>{'Menu'}</Menu>
      ) : null}
      {hasCancel ? (
        <Cancel onClick={() => history.goBack()}>Cancel</Cancel>
      ) : null}
      {conversation && isConversationDetail() ? (
        <Delete
          onClick={() => {
            setModalContents(<CancelConversationModal />)
            openModal()
          }}
        >
          Cancel
        </Delete>
      ) : null}
    </Container>
  )
}

const isConversationDetail = () => {
  const pathname = window.location.pathname
  return pathname.match(/conversations\/detail\/\d+$/)
}

const Container = styled<Props, any>('header')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 88px;
  background-color: ${props =>
    props.theme === 'white' ? '#f6f7fb' : '#138efd'};

  .is-pc & {
    width: 750px;
    right: 0;
    margin: auto;
  }
`

const Text = styled<Props, any>('div')`
  font-size: 34px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: ${props => (props.theme === 'white' ? '#405766' : '#ffffff')};
`

const BackButton = styled<Props, any>('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 32px;
  width: 24px;
  height: 42px;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${props => getArrowImage(props.theme)});
`

const ReturnButton = styled<Props, any>(Link)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 32px;
  width: 24px;
  height: 42px;
  margin: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${props => getArrowImage(props.theme)});
  color: ${props => (props.theme === 'white' ? '#405766' : '#ffffff')};
`

const getArrowImage = (theme: Theme) => {
  return resolvePath.image(
    theme === 'white'
      ? 'common/left-arrow@3x.png'
      : 'common/left-arrow-white@3x.png'
  )
}

const Cancel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 32px;
  height: 28px;
  margin: auto;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: right;
  color: #ffffff;
`

const Delete = styled.button`
  appearance: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 32px;
  height: 28px;
  margin: auto;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: right;
  color: #ffffff;
`

const Menu = styled(Link)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 32px;
  height: 28px;
  margin: auto;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: right;
  color: #ffffff;
`
