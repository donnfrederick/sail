import Router from 'components/organisms/Router'
import StudentsConversationsIndex from 'components/pages/students/Conversations/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsConversationsIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsConversationsIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
