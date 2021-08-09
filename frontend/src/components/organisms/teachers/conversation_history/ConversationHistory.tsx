import Button from 'components/atoms/teachers/Button'
import ConversationHistoryCard from 'components/molecules/teachers/ConversationHistoryCard'
import withConversationHistory from 'hocs/withConversationHistory'
import * as ConversationModels from 'models/conversation'
import * as ConversationHistoryModels from 'models/conversationHistory'
import * as React from 'react'
import styled from 'styled-components'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  conversationHistory: ConversationModels.Conversation[]
  meta: ConversationHistoryModels.Meta
  myId: number
  page: number
  forward(): void
  getConversationHistory(
    authToken: string,
    request: ConversationHistoryModels.GetConversationHistoryRequest
  ): Promise<void>
  getConversationsIdSuccess(conversation: ConversationModels.Conversation): void
  open(): void
  setContents(contents: JSX.Element): void
}

interface ButtonsProps {
  hasNext: boolean
}

export default withConversationHistory((props: Props) => {
  const {
    authToken,
    conversationHistory,
    meta,
    myId,
    page,
    forward,
    getConversationHistory,
    open,
    setContents
  } = props

  if (conversationHistory.length <= 0) {
    return <Container />
  }
  return (
    <Container>
      {conversationHistory.map(
        (conversation: ConversationModels.Conversation) => (
          <ConversationHistoryCard
            conversation={conversation}
            key={conversation.id}
            myId={myId}
            open={open}
            setContents={setContents}
          />
        )
      )}
      <Buttons hasNext={meta.next_page}>
        <Button
          type="white"
          text="戻る"
          width={344}
          height={112}
          fontSize={40}
          link={resolvePath.page('teachers', 'mypage')}
        />
        {meta.next_page ? (
          <Button
            type="blue"
            text="もっとみる"
            width={344}
            height={112}
            fontSize={40}
            onClick={() => {
              getConversationHistory(authToken, {
                page: page + 1
              })
              forward()
            }}
          />
        ) : null}
      </Buttons>
    </Container>
  )
})

const Container = styled.div`
  width: 736px;
  margin: 0 auto;
`

const Buttons = styled<ButtonsProps, any>('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 56px;
  display: flex;
  justify-content: ${props => (props.hasNext ? 'space-between' : 'center')};
  width: 720px;
  margin: 0 auto;
`
