import Router from 'components/organisms/Router'
import TeachersConversationsEvaluation from 'components/pages/teachers/Conversations/Evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersConversationsEvaluation />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersConversationsEvaluation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
