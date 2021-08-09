import ConversationMemo from 'components/atoms/students/user_profile/ConversationMemo'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationMemo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ConversationMemo memos={evaluations.memos} userName={''} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
