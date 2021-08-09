import Router from 'components/organisms/Router'
import ConversationHistoryDetail from 'components/templates/teachers/conversation_history/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FavoritesIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationHistoryDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
