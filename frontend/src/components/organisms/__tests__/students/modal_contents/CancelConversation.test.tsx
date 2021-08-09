import Router from 'components/organisms/Router'
import CancelConversation from 'components/organisms/students/modal_contents/cancel_conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CancelConversation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CancelConversation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
