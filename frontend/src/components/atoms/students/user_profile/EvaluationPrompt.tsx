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
  return (
    <div>
      {unratedConversations.map(
        (conversationItem: UnratedConversation, index: number) => {
          const { timestamp, id } = conversationItem
          return (
            <Item key={index}>
              <Text>
                Please rate your conversation on{' '}
                {moment.parseZone(timestamp).format('MMMM Do HH:mm')}.
              </Text>
              <Button
                type="blue"
                width={528}
                text="Rate"
                onClick={() => {
                  window.location.href = resolvePath.page(
                    'students',
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
