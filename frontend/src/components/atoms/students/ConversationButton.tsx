import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'
import * as SoraClient from 'utils/SoraClient'
import { isStaff } from 'utils/isHelte'
// import * as WebSocketClient from 'utils/WebSocketClient'

type ButtonType = 'end' | 'theme' | 'mode'

interface Props {
  conversationMode?: ConversationModels.ConversationMode
  isChatOpen?: boolean
  type: ButtonType
  openChat?: () => void
  closeEvent?: () => void
}

interface ChatButtonProps {
  isChatOpen?: boolean
}

interface ModeChangeButtonProps {
  conversationMode: ConversationModels.ConversationMode
}

export default (props: Props) => {
  const { conversationMode, isChatOpen, type, openChat, closeEvent } = props

  return type === 'end' ? (
    <EndButton onClick={closeEvent ? closeEvent : () => null} />
  ) : type === 'theme' && isStaff() ? (
    <ChatButton isChatOpen={isChatOpen} onClick={openChat} />
  ) : type === 'mode' ? (
    <ModeChangeButton
      conversationMode={conversationMode}
      onClick={() => SoraClient.changeMode()}
    />
  ) : null
}

const endIcon = resolvePath.image('students/conversation/end-call@3x.png')
const talkThemeIcon = resolvePath.image(
  'students/conversation/talk-theme@3x.png'
)
const closeIcon = resolvePath.image('students/conversation/close@3x.png')
const videoIcon = resolvePath.image('students/conversation/video@3x.png')
const soundOnlyIcon = resolvePath.image(
  'students/conversation/sound-only@3x.png'
)

const EndButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  width: 130px;
  height: 130px;
  margin: 0 50px;
  border-radius: 65px;
  background-color: #fd4531;
  background-repeat: no-repeat;
  background-size: 86px 86px;
  background-position: center;
  background-image: url(${endIcon});
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 2px 20px -3px rgba(5, 68, 102, 0.4)'};
`

const ChatButton = styled<ChatButtonProps, any>('button')`
  appearance: none;
  border: none;
  outline: none;
  width: 130px;
  height: 130px;
  margin: 0 50px;
  border-radius: 65px;
  background-repeat: no-repeat;
  background-size: 86px 86px, 100% 100%;
  background-position: center;
  background-image: ${props =>
    props.isChatOpen
      ? `url(${closeIcon}), linear-gradient(135deg, #ffffff, #ffffff)`
      : `url(${talkThemeIcon}), linear-gradient(135deg, #26c5ff, #2de6f7)`};
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 2px 20px -3px rgba(5, 68, 102, 0.4)'};
`

const ModeChangeButton = styled<ModeChangeButtonProps, any>('button')`
  appearance: none;
  border: none;
  outline: none;
  width: 130px;
  height: 130px;
  margin: 0 50px;
  border-radius: 65px;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-size: 86px 86px;
  background-position: center;
  background-image: ${props =>
    props.conversationMode === 'soundOnly'
      ? `url(${videoIcon})`
      : `url(${soundOnlyIcon})`};
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 2px 20px -3px rgba(5, 68, 102, 0.4)'};
`

// ) : type === 'theme' ? (
//   <TalkThemeButton
//     onClick={() =>
//         ? WebSocketClient.sendTopicsClose()
//         : WebSocketClient.sendTopicsOpen()
//     }
//   />
