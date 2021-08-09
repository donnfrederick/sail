import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import * as SoraClient from 'utils/SoraClient'
import { isStaff } from 'utils/isHelte'
// import resolvePath from 'utils/resolvePath'
// import * as WebSocketClient from 'utils/WebSocketClient'

type ButtonType = 'end' | 'theme' | 'mode'

interface Props {
  conversationMode?: ConversationModels.ConversationMode
  isChatOpen?: boolean
  text: string
  type: ButtonType
  openChat?: () => void
  closeEvent?: () => void
}

interface ChatButtonProps {
  isChatOpen?: boolean
}

export default (props: Props) => {
  const {
    // conversationMode,
    isChatOpen,
    text,
    type,
    openChat,
    closeEvent
  } = props

  return type === 'end' ? (
    <EndButton onClick={closeEvent ? closeEvent : () => null}>{text}</EndButton>
  ) : type === 'theme' && isStaff() ? (
    <ChatButton isChatOpen={isChatOpen} onClick={openChat}>
      {text}
    </ChatButton>
  ) : type === 'mode' ? (
    <ModeChangeButton onClick={() => SoraClient.changeMode()}>
      {text}
    </ModeChangeButton>
  ) : null
}

const EndButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  width: 180px;
  height: 88px;
  margin: 0 16px;
  padding: 0;
  border-radius: 56px;
  background-color: #fd4531;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 20px -5px rgba(44, 44, 44, 0.6)'};
  font-size: 28px;
  font-weight: 500;
  line-height: 88px;
  text-align: center;
  color: #ffffff;
`

const ChatButton = styled<ChatButtonProps, any>('button')`
  appearance: none;
  border: none;
  outline: none;
  width: 312px;
  height: 112px;
  margin: 0 16px;
  padding: 0;
  border-radius: 56px;
  background-image: ${props =>
    props.isChatOpen
      ? 'linear-gradient(110deg, #ffffff, #ffffff)'
      : 'linear-gradient(110deg, #26c5ff, #2de6f7)'};
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 20px -5px rgba(44, 44, 44, 0.6)'};
  font-size: 40px;
  font-weight: 500;
  line-height: 112px;
  letter-spacing: 0px;
  text-align: center;
  color: ${props => (props.isChatOpen ? '#27c8ff' : '#ffffff')};
`

const ModeChangeButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  width: 180px;
  height: 88px;
  margin: 0 16px;
  padding: 0;
  border-radius: 56px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 20px -5px rgba(44, 44, 44, 0.6)'};
  font-size: 28px;
  font-weight: 500;
  line-height: 88px;
  text-align: center;
  color: #405766;
`
