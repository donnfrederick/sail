import ConversationButton from 'components/atoms/students/ConversationButton'
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
      <ConversationButton type="end" closeEvent={closeEvent} />
      <ConversationButton
        type="theme"
        isChatOpen={isChatOpen}
        openChat={openChat}
      />
      <ConversationButton type="mode" conversationMode={conversationMode} />
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
`
