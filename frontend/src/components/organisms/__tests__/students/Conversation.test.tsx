import Router from 'components/organisms/Router'
import Conversation from 'components/organisms/students/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Conversation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Conversation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
