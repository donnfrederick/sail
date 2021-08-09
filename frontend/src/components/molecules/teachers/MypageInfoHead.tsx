import Week from 'components/atoms/teachers/Week'
import { store } from 'components/organisms/Router'
import * as ConversationModels from 'models/conversation'
import moment from 'moment'
import * as React from 'react'
import { getConversations } from 'reducers/conversation'
import styled from 'styled-components'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  authToken: string
  page: number
  reservations: ConversationModels.ConversationResponse | null
  back(): void
  forward(): void
}

export default (props: Props) => {
  const { authToken, back, forward, page, reservations } = props

  const startOn = reservations
    ? ''
    : moment()
        .startOf('week')
        .format('YYYY-MM-DD') + ''
  return (
    <Container>
      {reservations ? (
        <Week reservations={reservations} start={reservations.meta.start_on} />
      ) : (
        <Week reservations={null} start={startOn} />
      )}
      <LeftArrow
        src={resolvePath.image('common/left-arrow.png')}
        data-disabled={page < 2}
        onClick={() => {
          back()
          store.dispatch<any>(
            getConversations(authToken, { term: 'week', page: page - 1 })
          )
        }}
      />
      <RightArrow
        src={resolvePath.image('common/right-arrow.png')}
        onClick={() => {
          forward()
          store.dispatch<any>(
            getConversations(authToken, { term: 'week', page: page + 1 })
          )
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 24px;
  padding-top: 24px;
  background-color: #ffffff;
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 1px 8px 0 rgba(5, 68, 102, 0.2)'};
`

const LeftArrow = styled.img`
  position: absolute;
  left: 32px;
  bottom: 32px;
  width: 20px;
  height: 34px;

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.4;
  }
`

const RightArrow = styled.img`
  position: absolute;
  right: 32px;
  bottom: 32px;
  width: 20px;
  height: 34px;

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.4;
  }
`
