import Router from 'components/organisms/Router'
import Conversation from 'components/organisms/teachers/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Conversation />', () => {
  const tree = renderer
    .create(
      <Router>
        <Conversation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
