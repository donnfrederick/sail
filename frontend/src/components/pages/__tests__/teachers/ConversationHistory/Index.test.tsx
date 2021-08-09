import Router from 'components/organisms/Router'
import ConversationHistoryIndex from 'components/pages/teachers/ConversationHistory/Index'
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
