import ConversationBalloon from 'components/atoms/ConversationBalloon'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationBalloon />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ConversationBalloon text="そろそろお別れの時間です" />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
