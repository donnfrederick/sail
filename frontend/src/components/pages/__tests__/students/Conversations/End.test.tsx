import Router from 'components/organisms/Router'
import StudentsConversationsEnd from 'components/pages/students/Conversations/End'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsConversationsEnd />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsConversationsEnd />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
