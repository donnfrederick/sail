import Router from 'components/organisms/Router'
import Evaluation from 'components/organisms/teachers/evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Modal />', () => {
  const tree = renderer
    .create(
      <Router>
        <Evaluation type="completed" />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
