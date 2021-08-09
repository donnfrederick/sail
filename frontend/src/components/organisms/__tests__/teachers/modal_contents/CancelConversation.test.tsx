import Router from 'components/organisms/Router'
import CancelConversation from 'components/organisms/teachers/modal_contents/cancel_conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CancelConversation />', () => {
  const tree = renderer
    .create(
      <Router>
        <CancelConversation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
