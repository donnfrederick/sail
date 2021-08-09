import * as React from 'react'
import styled from 'styled-components'

import Memo from 'components/atoms/Memo'
import Button from 'components/atoms/teachers/Button'
import { Conversation } from 'models/conversation'

interface Props {
  authToken: string
  conversation: Conversation
  myId: number
  patchConversationsMemo(authToken: string, id: number, memo: string): void
  postConversationsMemo(authToken: string, id: number, memo: string): void
  close(): void
}

export default ({
  authToken,
  close,
  conversation,
  myId,
  patchConversationsMemo,
  postConversationsMemo
}: Props) => {
  if (!conversation) {
    return null
  }
  const existingMemoData = conversation
    ? conversation.memos.find(
        conversationMemo => conversationMemo.user_id === myId
      )
    : null
  const [memo, setMemo] = React.useState<string>(
    existingMemoData ? existingMemoData.memo : ''
  )
  const onMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value
    if (value.length > 1024) {
      value = value.substring(0, 1024)
    }
    setMemo(value)
  }
  const saveMemoFn = existingMemoData
    ? patchConversationsMemo
    : postConversationsMemo
  return (
    <Container>
      <Title>Edit Memo</Title>
      <Memo
        width={500}
        onChange={onMemoChange}
        value={memo.length > 1024 ? memo.substring(0, 1024) : memo}
      />
      <ButtonContainer>
        <Button
          width={224}
          height={56}
          fontSize={28}
          type="red"
          text="Cancel"
          onClick={() => {
            close()
          }}
        />
        <Button
          width={224}
          height={56}
          fontSize={28}
          type="blue"
          text="Edit"
          onClick={() => {
            saveMemoFn(authToken, conversation.id, memo)
            close()
            window.location.reload()
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 36px;
  line-height: 2;
  margin-top: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 72px;
`
