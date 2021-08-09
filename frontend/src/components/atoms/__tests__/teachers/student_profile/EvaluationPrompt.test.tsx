import EvaluationPrompt from 'components/atoms/teachers/user_profile/EvaluationPrompt'
import Router from 'components/organisms/Router'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EvaluationPrompt />', () => {
  const tree = renderer
    .create(
      <Router>
        <EvaluationPrompt
          unratedConversations={evaluations.unrated_conversations}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
