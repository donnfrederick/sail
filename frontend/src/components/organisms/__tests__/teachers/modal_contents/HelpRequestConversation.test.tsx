import Router from 'components/organisms/Router'
import HelpRequestConversation from 'components/organisms/teachers/modal_contents/help_request_conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <HelpRequestConversation />', () => {
  const tree = renderer
    .create(
      <Router>
        <HelpRequestConversation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
