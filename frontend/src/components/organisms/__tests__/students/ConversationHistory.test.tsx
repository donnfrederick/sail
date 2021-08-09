import Router from 'components/organisms/Router'
import ConversationHistory from 'components/organisms/students/conversation_history'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationHistory />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationHistory />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
