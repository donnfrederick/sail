import Router from 'components/organisms/Router'
import TeachersConversationsEnd from 'components/pages/teachers/Conversations/End'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersConversationsEnd />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersConversationsEnd />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
