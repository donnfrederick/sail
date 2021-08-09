import ConversationMemo from 'components/atoms/teachers/user_profile/ConversationMemo'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationMemo />', () => {
  const tree = renderer
    .create(<ConversationMemo memos={evaluations.memos} userName={''} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
