import UserProfile from 'components/organisms/teachers/user_profile'
import withConversationId from 'hocs/withConversationId'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import getPartner from 'utils/getPartner'

interface Props {
  conversation: ConversationModels.Conversation | null
  myId: number
}

export default withConversationId(({ conversation, myId }: Props) => {
  const partner = conversation ? getPartner(conversation, myId) : null
  return partner ? (
    <UserProfile user={partner} myId={myId} type="complete" />
  ) : null
})
