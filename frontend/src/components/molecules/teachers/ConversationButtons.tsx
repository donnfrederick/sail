import ConversationButton from 'components/atoms/teachers/ConversationButton'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  conversationMode: ConversationModels.ConversationMode
  isChatOpen: boolean
  openChat: () => void
  closeEvent: () => void
}

export default (props: Props) => {
  const { conversationMode, isChatOpen, openChat, closeEvent } = props

  return (
    <ButtonContainer>
      <ConversationButton type="end" text="通話終了" closeEvent={closeEvent} />
      <ConversationButton
        type="theme"
        text="チャット"
        isChatOpen={isChatOpen}
        openChat={openChat}
      />
      <ConversationButton
        type="mode"
        text={conversationMode === 'soundOnly' ? 'ビデオ通話' : '音声通話'}
      />
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 208px;
  background-color: rgba(0, 0, 0, 0.4);
`
