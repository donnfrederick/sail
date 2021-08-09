import Router from 'components/organisms/Router'
import ConversationHistoryIndex from 'components/templates/teachers/conversation_history/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationHistoryIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationHistoryIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
