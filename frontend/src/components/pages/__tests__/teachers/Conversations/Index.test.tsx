import Router from 'components/organisms/Router'
import TeachersConversationsIndex from 'components/pages/teachers/Conversations/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersConversationsIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersConversationsIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
