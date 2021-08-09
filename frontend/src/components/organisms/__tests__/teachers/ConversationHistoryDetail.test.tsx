import Router from 'components/organisms/Router'
import ConversationHistoryDetail from 'components/organisms/teachers/conversation_history_detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationHistoryDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationHistoryDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
