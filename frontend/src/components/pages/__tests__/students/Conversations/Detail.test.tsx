import Router from 'components/organisms/Router'
import StudentsConversationsDetail from 'components/pages/students/Conversations/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsConversationsDetail />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsConversationsDetail />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
