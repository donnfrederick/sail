import Router from 'components/organisms/Router'
import ConversationEvaluation from 'components/templates/teachers/conversations/Evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConversationEvaluation />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConversationEvaluation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
