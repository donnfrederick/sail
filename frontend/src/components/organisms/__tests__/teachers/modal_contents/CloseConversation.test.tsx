import Router from 'components/organisms/Router'
import CloseConversation from 'components/organisms/teachers/modal_contents/close_conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CloseConversation />', () => {
  const tree = renderer
    .create(
      <Router>
        <CloseConversation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
