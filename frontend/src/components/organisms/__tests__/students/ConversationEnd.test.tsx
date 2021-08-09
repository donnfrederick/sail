import Router from 'components/organisms/Router'
import ConversationEnd from 'components/organisms/students/conversation_end'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationEnd />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationEnd />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
