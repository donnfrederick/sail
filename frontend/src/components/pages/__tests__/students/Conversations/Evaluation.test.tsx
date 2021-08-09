import Router from 'components/organisms/Router'
import StudentsConversationsEvaluation from 'components/pages/students/Conversations/Evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <StudentsConversationsEvaluation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <StudentsConversationsEvaluation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
