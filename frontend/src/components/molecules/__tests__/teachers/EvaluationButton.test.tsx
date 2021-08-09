import EvaluationButton from 'components/molecules/teachers/EvaluationButton'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EvaluationButton />', () => {
  const tree = renderer
    .create(
      <Router>
        <EvaluationButton
          starScore={5}
          text="とても楽しかった"
          onClick={() => null}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
