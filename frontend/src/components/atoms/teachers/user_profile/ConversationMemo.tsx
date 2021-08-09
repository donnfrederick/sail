import { Memo } from 'models/evaluations'
import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  userName: string
  memos: Memo[]
}
export default ({ userName, memos }: Props) => {
  moment.locale('ja')
  return (
    <Container>
      <Title>{userName}さんとの会話履歴</Title>
      {memos.map((item: Memo, index: number) => (
        <Rating key={index}>
          <RatingDate>
            {moment.parseZone(item.timestamp).format('YYYY年M月D日(dd) HH:mm')}
          </RatingDate>
          <RatingContent>{item.memo}</RatingContent>
        </Rating>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding-top: 48px;
  border-top: 1px solid black;
`

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`

const Rating = styled.div`
  padding: 45px 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const RatingDate = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
`

const RatingContent = styled.div`
  font-size: 36px;
`
