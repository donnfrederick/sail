import Router from 'components/organisms/Router'
import CloseConversation from 'components/organisms/students/modal_contents/close_conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CloseConversation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CloseConversation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
