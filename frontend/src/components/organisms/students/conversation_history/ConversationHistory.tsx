import Button from 'components/atoms/students/Button'
import ConversationHistoryCard from 'components/molecules/students/ConversationHistoryCard'
import withConversationHistory from 'hocs/withConversationHistory'
import * as ConversationModels from 'models/conversation'
import * as ConversationHistoryModels from 'models/conversationHistory'
import * as React from 'react'
import styled from 'styled-components'

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
  open(): void
  setContents(contents: JSX.Element): void
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
      {meta.next_page ? (
        <Button
          type="blue"
          text={'Show More'}
          width={590}
          height={88}
          fontSize={32}
          onClick={() => {
            getConversationHistory(authToken, {
              page: page + 1
            })
            forward()
          }}
        />
      ) : null}
    </Container>
  )
})

const Container = styled.div`
  width: 686px;
  margin: 0 auto;
`
