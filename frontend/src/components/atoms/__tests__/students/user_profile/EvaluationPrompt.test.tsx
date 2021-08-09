import EvaluationPrompt from 'components/atoms/students/user_profile/EvaluationPrompt'
import Router from 'components/organisms/Router'
import { evaluations } from 'mocks/sampleData/evaluations'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <EvaluationPrompt />', () => {
  const tree = renderer
    .create(
      <Intl>
      <Router>
        <EvaluationPrompt
          unratedConversations={evaluations.unrated_conversations}
        />
      </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
