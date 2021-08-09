import Router from 'components/organisms/Router'
import ConversationEnd from 'components/organisms/teachers/conversation_end'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationEnd />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationEnd />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
