import * as React from 'react'
import styled, { css } from 'styled-components'

import RoundImage from 'components/atoms/RoundImage'
import * as UserProfileModels from 'models/userProfile'

import withEvaluations from 'hocs/withEvaluations'

import resolvePath from 'utils/resolvePath'

import StatusButton from 'components/atoms/teachers/user_profile/StatusButton'
import StudentJapaneseLevel from 'components/atoms/teachers/user_profile/StudentJapaneseLevel'
import UserSatisfaction from 'components/atoms/teachers/user_profile/UserSatisfaction'

import StudentEvaluation from 'components/molecules/teachers/StudentEvaluation'
import UserBiography from 'components/molecules/teachers/UserBiography'

export default withEvaluations((props: UserProfileModels.ProfilePageProps) => {
  const { user, isSelf, open, type, setContents, evaluations } = props

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

  const isFavorite = user ? user.is_favorite : false
  const isBlocked = user ? user.is_blocked : false
  const hasEvaluation = user
    ? Object.values(user.evaluate).reduce(
        (acc: number, val: number) => acc + val
      )
    : false

  const badge = isSelf
    ? user
      ? user.highly_reliable
        ? 'elder'
        : null
      : null
    : user.grade

  return user ? (
    <Container>
      <UserOverview>
        <RoundImage
          src={user.picture_url || resolvePath.image('common/user.png')}
          size={200}
          badge={badge}
          code={user.country_code}
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
          <Name data-self={isSelf}>{user.name}</Name>
          {isSelf ? (
            <Supporter data-self={isSelf}>Sail公認サポーター</Supporter>
          ) : (
            <ConversationNumberText>
              この方と{withSelfConversationNum}回会話しています
            </ConversationNumberText>
          )}
        </UserInfo>
      </UserOverview>
      <Introduce>{user.introduce}</Introduce>
      <UserBiography
        country={user.country}
        hobbies={user.hobbies}
        sex={user.sex}
        purposes={user.purposes}
      />
      {hasEvaluation || isSelf ? (
        <UserSatisfactionContainer>
          <UserSatisfaction
            conversationNumber={conversationNum}
            satisfaction={user.evaluate}
          />
        </UserSatisfactionContainer>
      ) : null}
      {!isSelf ? (
        <JapaneseLevelContainer>
          <StudentJapaneseLevel text={String(user.conversation_level)} />
        </JapaneseLevelContainer>
      ) : null}
      {type !== 'basic' && !isSelf ? (
        <StudentEvaluation evaluations={evaluations} user={user} type={type} />
      ) : null}
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
  margin: 0 40px;
  color: #405766;
  text-align: left;
`

const Name = styled.div`
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0px;

  &[data-self='false']::after {
    font-size: 40px;
    content: ' さん';
  }

  &[data-self='true']::after {
    margin-bottom: 0;
    line-height: 0;
  }
`

const Supporter = styled.div`
  margin-bottom: 0;
  line-height: 0;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0px;
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
  justify-content: space-around;
  margin-left: 28px;
`

const StatusButtonContainer = styled.div`
  align-self: flex-end;
`

const ConversationNumberText = styled.div`
  font-size: 32px;
`

// UserSatisfaction

const sectionBorder = css`
  border-bottom: 1px solid black;
`

const UserSatisfactionContainer = styled.div`
  ${sectionBorder};
`

// JapaneseLevel

const JapaneseLevelContainer = styled.div`
  ${sectionBorder};
`
