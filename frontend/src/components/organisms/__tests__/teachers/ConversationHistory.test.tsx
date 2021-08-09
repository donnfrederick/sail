import Router from 'components/organisms/Router'
import ConversationHistory from 'components/organisms/teachers/conversation_history'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationHistory />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationHistory />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
