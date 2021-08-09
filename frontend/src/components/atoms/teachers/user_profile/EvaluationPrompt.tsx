import moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'

import Button from 'components/atoms/teachers/Button'
import { UnratedConversation } from 'models/evaluations'
import resolvePath from 'utils/resolvePath'

interface Props {
  unratedConversations: UnratedConversation[]
}

export default ({ unratedConversations }: Props) => {
  moment.locale('ja')
  return (
    <div>
      {unratedConversations.map(
        (unratedConversation: UnratedConversation, index: number) => {
          const { timestamp, id } = unratedConversation
          return (
            <Item key={index}>
              <Text>
                {moment.parseZone(timestamp).format('M月D日 HH:mm')}にこの方と会話をしましたが、未評価状態です。評価してあげると大変喜びます。
              </Text>
              <Button
                type="blue"
                width={528}
                text="評価する"
                onClick={() => {
                  window.location.href = resolvePath.page(
                    'teachers',
                    `conversations/${id}/evaluate`
                  )
                }}
              />
            </Item>
          )
        }
      )}
    </div>
  )
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const Text = styled.div`
  margin-bottom: 48px;
  font-size: 32px;
  line-height: 48px;
`
