import moment from 'moment'
import * as React from 'react'
import styled, { css } from 'styled-components'
import isHuawei from 'utils/isHuawei'

import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/teachers/Button'
import StatusButton from 'components/atoms/teachers/user_profile/StatusButton'
import MemoEditModal from 'components/organisms/teachers/modal_contents/memo_edit'
import * as ConversationModels from 'models/conversation'
import * as EvaluationsModels from 'models/evaluations'
import emojiSrc from 'utils/emojiSrc'
import getPartner from 'utils/getPartner'
import { getChatQualityNames } from 'utils/manipulate'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation
  myId: number
  open(): void
  setContents(contents: JSX.Element): void
}

export default ({ conversation, myId, open, setContents }: Props) => {
  moment.locale('ja')
  const partner = getPartner(conversation, myId)
  const selfEvaluate = conversation.evaluate.find(
    conversationEvaluate => conversationEvaluate.user_id === myId
  )
  const evaluate = selfEvaluate ? selfEvaluate.evaluate : null
  const selfMemo = conversation.memos.find(
    conversationMemo => conversationMemo.user_id === myId
  )
  const selfStatus = conversation.statuses.find(
    conversationStatus => conversationStatus.user_id === myId
  )
  const shouldEvaluate =
    selfStatus && selfStatus.status === 'Absent' ? false : true
  const memo = selfMemo ? selfMemo.memo : null
  const date = `${moment
    .parseZone(conversation.start_at)
    .format('YYYY年M月D日(ddd)')}\n${moment
    .parseZone(conversation.start_at)
    .format('HH:mm')} - ${moment
    .parseZone(conversation.end_at)
    .format('HH:mm')}`
  return partner ? (
    <Container>
      <Heading>
        <Date>{date}</Date>
        <StatusButton
          userId={partner.id}
          isFavorite={partner.is_favorite}
          isBlocked={partner.is_blocked}
          open={open}
          setContents={setContents}
        />
      </Heading>
      {partner ? (
        <Info>
          <RoundImage
            src={partner.picture_url}
            size={150}
            badge={partner.grade}
            code={partner ? partner.country_code : ''}
          />
          <Name>{partner.name}</Name>
          {evaluate ? <Emoji src={emojiSrc('active')[evaluate.fun]} /> : null}
        </Info>
      ) : null}
      {evaluate ? (
        <Evaluation>
          {evaluate.ability ? (
            <EvaluationItem>
              <Label>日本語レベル</Label>
              <Value>
                {EvaluationsModels.japaneseLevelEnum[evaluate.ability]}
              </Value>
            </EvaluationItem>
          ) : null}
          <EvaluationItem>
            <Label>時間</Label>
            <Value>
              {evaluate.time
                ? EvaluationsModels.punctualityTeacherEnum[evaluate.time]
                : ''}
            </Value>
          </EvaluationItem>
          <EvaluationItem>
            <Label>会話環境</Label>
            <Value>
              {evaluate.quality.length > 0
                ? getChatQualityNames('ja')(evaluate.quality).join('・')
                : '問題なし'}
            </Value>
          </EvaluationItem>
          {memo ? (
            <EvaluationItem>
              <Label>メモ</Label>
              <Value>{memo}</Value>
            </EvaluationItem>
          ) : null}
        </Evaluation>
      ) : (
        <NoEvaluationText>
          {shouldEvaluate ? 'まだ評価していません' : ''}
        </NoEvaluationText>
      )}
      <ButtonContainer>
        <Button
          width={224}
          height={56}
          fontSize={28}
          type="white"
          text="詳細を見る"
          link={resolvePath.page('teachers', `history/${conversation.id}`)}
        />
        {evaluate ? (
          <Button
            width={224}
            height={56}
            fontSize={28}
            type="white"
            text="メモの編集"
            onClick={() => {
              setContents(<MemoEditModal conversation={conversation} />)
              open()
            }}
          />
        ) : (
          <Button
            width={224}
            height={56}
            fontSize={28}
            type="blue"
            text="評価する"
            onClick={() => {
              window.location.href = `/teachers/conversations/${
                conversation.id
              }/evaluate`
            }}
          />
        )}
      </ButtonContainer>
    </Container>
  ) : null
}

const textStyle = css`
  font-size: 32px;
  line-height: 1.5;
`

const Container = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin-bottom: 24px;
  border-radius: 16px;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px 0 rgb(5, 68, 102, 0.35)'};
  color: #405766;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
`

const Date = styled.div`
  ${textStyle};
  font-weight: bold;
  white-space: pre-wrap;
`

const Info = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
`

const Name = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 0 41px;
`

const Emoji = styled.img`
  width: 64px;
  height: 64px;
`

const Evaluation = styled.div`
  margin-bottom: 60px;
`

const EvaluationItem = styled.div`
  display: flex;
  margin-bottom: 40px;
`
const Label = styled.div`
  ${textStyle};
  width: 208px;
  font-weight: bold;
  flex-shrink: 0;
`

const Value = styled.div`
  ${textStyle};
`

const NoEvaluationText = styled.div`
  ${textStyle};
  font-weight: bold;
  text-align: center;
  margin-bottom: 60px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
