import Router from 'components/organisms/Router'
import ConfirmEvaluation from 'components/organisms/teachers/modal_contents/confirm_evaluation'
import { conversation } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmEvaluation />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmEvaluation conversation={conversation} myId={1} score={3} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
