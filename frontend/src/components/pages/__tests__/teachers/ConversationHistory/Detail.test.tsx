import Router from 'components/organisms/Router'
import ConversationHistoryDetail from 'components/pages/teachers/ConversationHistory/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationHistoryIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationHistoryDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
