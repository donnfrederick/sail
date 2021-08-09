import Router from 'components/organisms/Router'
import ConversationIndex from 'components/templates/teachers/conversations/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
