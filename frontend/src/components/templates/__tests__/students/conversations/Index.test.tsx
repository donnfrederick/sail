import Router from 'components/organisms/Router'
import ConversationIndex from 'components/templates/students/conversations/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ConversationIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ConversationIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
