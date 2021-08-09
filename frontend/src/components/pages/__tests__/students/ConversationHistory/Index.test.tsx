import Router from 'components/organisms/Router'
import ConversationHistoryIndex from 'components/pages/students/ConversationHistory/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationHistoryIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationHistoryIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
