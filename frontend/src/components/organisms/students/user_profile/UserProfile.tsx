import { store } from 'components/organisms/Router'
import RoundImage from 'components/atoms/RoundImage'
import ProfileItem from 'components/atoms/students/ProfileItem'
import * as StudentsModels from 'models/students'
import * as UserProfileModels from 'models/userProfile'
import * as React from 'react'
import styled, { css } from 'styled-components'
import { getHobbieNames } from 'utils/manipulate'
import resolvePath from 'utils/resolvePath'

import StatusButton from 'components/atoms/students/user_profile/StatusButton'
import UserSatisfaction from 'components/atoms/students/user_profile/UserSatisfaction'

import TeacherEvaluation from 'components/molecules/students/TeacherEvaluation'
import withEvaluations from 'hocs/withEvaluations'
import { FormattedMessage } from 'react-intl'
import { getIssues, State as IssueState } from 'reducers/issues'
import getAuthToken from 'utils/getAuthToken'

export type PageType = 'basic' | 'reservation' | 'complete' | 'block'

export default withEvaluations((props: UserProfileModels.ProfilePageProps) => {
  const { user, open, isSelf, type, setContents, evaluations } = props

  const [subscription, setSubscription] = React.useState({
    plan: '',
    conversations: ''
  })

  const conversations = user
    ? user.conversations.filter(
        conversation =>
          conversation.status === 'completed' ||
          conversation.status === 'failed'
      )
    : null
  const conversationNum = conversations ? conversations.length : 0
  const withSelfConversationNum = conversations
    ? conversations.filter(conversation => conversation.with_self).length
    : 0

  const gender = user ? StudentsModels.GenderEnum[user.sex] : ''
  const genderPronoun =
    gender === 'Male' ? 'him' : gender === 'Female' ? 'her' : 'him/her'

  const isFavorite = user ? user.is_favorite : false
  const isBlocked = user ? user.is_blocked : false
  const hasEvaluation = user
    ? Object.values(user.evaluate).reduce(
        (acc: number, val: number) => acc + val
      )
    : false

  // TODO: this clause is highly complicated
  const level =
    user.rated_conversation_level &&
    (user.rated_conversation_level === 1 ||
      user.rated_conversation_level === 2 ||
      user.rated_conversation_level === 3 ||
      user.rated_conversation_level === 4 ||
      user.rated_conversation_level === 5)
      ? StudentsModels.JapaneseConversationLevelToText(
          user.rated_conversation_level
        ) || null
      : null

  const grade = isSelf
    ? user.grade
    : user
      ? user.highly_reliable
        ? 'elder'
        : null
      : null

  /* 
  *** Subscription statusの判定ロジック ***
  1. まず帰って来たIssuesの最後のIssueを見る。
  2. TypeがFreeであればTrial中
  3. TypeがFree以外であれば少なくても有料に申し込んだことのある人と判定していい
  4. 次にexpired_at を見る。Freeではなくexpired_at が未来なら subscribed と判定していい
  5. 会話回数は純粋にconversations の数または -1 なら unlimited と書いていいと思う。
  6. 上記どれでもなければ、有効なIssueがなく会話に薦めないので not subscribed でいいんじゃないかな
  */
  function checkSubscriptionStatus(
    issue: IssueState
  ): { plan: string; conversations: string } {
    if (issue && issue.issues && issue.issues.length > 0) {
      const latestIssue = issue.issues[issue.issues.length - 1]
      const plan =
        latestIssue.type === 'free'
          ? 'Trial'
          : latestIssue.expired_at &&
            Date.parse(latestIssue.expired_at) > Date.now()
            ? 'Subscribed'
            : 'Subscription expired'
      const conversations =
        latestIssue.conversations === -1
          ? 'Unlimited conversations'
          : `${latestIssue.conversations} conversations`
      return { plan, conversations }
    }
    return { plan: 'Not subscribed', conversations: '' }
  }

  React.useEffect(() => {
    const getSubscription = async () => {
      const authToken = getAuthToken()
      if (authToken) {
        await store.dispatch<any>(getIssues(authToken))
        setSubscription(
          checkSubscriptionStatus(store.getState().rootReducer.issues)
        )
        return
      }
    }
    getSubscription()
  }, [])

  return user ? (
    <Container>
      <UserOverview>
        <RoundImage
          src={user ? user.picture_url : resolvePath.image('common/user.png')}
          size={200}
          badge={grade}
          code={user ? user.country_code : ''}
        />
        <UserInfo>
          {type !== 'basic' && !isSelf ? (
            <StatusButtonContainer>
              <StatusButton
                isBlocked={isBlocked}
                isFavorite={isFavorite}
                userId={user.id}
                setContents={setContents}
                open={open}
              />
            </StatusButtonContainer>
          ) : null}
          <Name>{user ? user.name : ''}</Name>
          {!isSelf ? (
            <ConversationNumberText>
              You had {withSelfConversationNum} conversations with{' '}
              {genderPronoun}
            </ConversationNumberText>
          ) : (
            <>
              <SubscriptionStatus>{subscription.plan}</SubscriptionStatus>
              <ConversationNumberText>
                {subscription.conversations}
              </ConversationNumberText>
            </>
          )}
        </UserInfo>
      </UserOverview>
      <Introduce>{user.introduce}</Introduce>
      <ProfileList>
        <ProfileItem text={gender} type={'gender'} />
        {user.location ? (
          <ProfileItem text={user.location} type={'location'} />
        ) : null}
        {user.country && isSelf ? (
          <ProfileItem text={user.country} type={'nationality'} />
        ) : null}
        <ProfileItem
          text={user ? getHobbieNames(user.hobbies).join(', ') : ''}
          type={'hobbies'}
        />
        {user.conversation_level && user.level && isSelf ? (
          <>
            <FormattedMessage id="mypage.japanese_skill">
              {chunks => (
                <Heading>
                  {chunks ? chunks[0] : 'Japanese Skill (Self-Registered)'}
                </Heading>
              )}
            </FormattedMessage>

            <ProfileItem
              text={
                StudentsModels.JapaneseConversationLevelToText(
                  Number(user.conversation_level)
                ) || ''
              }
              type={'level'}
            />
            <ProfileItem
              text={StudentsModels.JLPTLevelToText(Number(user.level)) || ''}
              type={'level'}
            />
            {level ? (
              <RatedJapaneseLevel>
                <ProfileItem text={level} type={'level'} />
              </RatedJapaneseLevel>
            ) : null}
            <FormattedMessage id="mypage.rating">
              {chunks => <Heading>{chunks ? chunks[0] : 'Ratings'}</Heading>}
            </FormattedMessage>
          </>
        ) : null}
      </ProfileList>
      {hasEvaluation || isSelf ? (
        <UserSatisfactionContainer>
          <UserSatisfaction
            conversationNumber={conversationNum}
            satisfaction={user.evaluate}
          />
        </UserSatisfactionContainer>
      ) : null}
      {type !== 'basic' && (
        <TeacherEvaluation evaluations={evaluations} user={user} type={type} />
      )}
    </Container>
  ) : null
})

const Introduce = styled.div`
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 40px;
  margin-bottom: 60px;
`

const Container = styled.div`
  color: #405766;
  text-align: left;
`

const Name = styled.div`
  width: 448px;
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: 0.5px;
  white-space: pre-wrap;
`

const ProfileList = styled.div`
  width: 100%;
  margin-bottom: 25px;
`

const RatedJapaneseLevel = styled.div`
  margin: 56px 0;
`

const UserOverview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  justify-content: space-around;
  margin-left: 28px;
`

const StatusButtonContainer = styled.div`
  align-self: flex-end;
`

const ConversationNumberText = styled.div`
  font-size: 26px;
`

const SubscriptionStatus = styled.div`
  font-size: 35px;
`

// UserSatisfaction

const sectionBorder = css`
  border-bottom: 1px solid black;
`

const UserSatisfactionContainer = styled.div`
  ${sectionBorder};
`

// Self-Only Heading

const Heading = styled.h1`
  font-size: 40px;
`
