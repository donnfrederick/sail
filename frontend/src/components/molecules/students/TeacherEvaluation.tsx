import * as React from 'react'

import BlockMemo from 'components/atoms/students/user_profile/BlockMemo'
import ConversationMemo from 'components/atoms/students/user_profile/ConversationMemo'
import EvaluationPrompt from 'components/atoms/students/user_profile/EvaluationPrompt'

import * as EvaluationsModels from 'models/evaluations'
import * as UserProfileModels from 'models/userProfile'

interface Props {
  evaluations: EvaluationsModels.Evaluations | null
  user: UserProfileModels.UserProfile
  type: UserProfileModels.PageType
}

export default ({ evaluations, user, type }: Props) => {
  const showEvaluationPrompt = type === 'complete'
  const showMemo = type === 'reservation' || type === 'complete'
  const showBlock = type !== 'basic'
  if (evaluations) {
    const { unrated_conversations, memos, reports } = evaluations
    return (
      <>
        {showEvaluationPrompt && unrated_conversations.length ? (
          <EvaluationPrompt unratedConversations={unrated_conversations} />
        ) : null}
        {showMemo && user && memos.length ? (
          <ConversationMemo userName={user.name} memos={memos} />
        ) : null}
        {showBlock && reports.length ? <BlockMemo reports={reports} /> : null}
      </>
    )
  } else {
    return null
  }
}
