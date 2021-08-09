import Router from 'components/organisms/Router'
import Evaluation from 'components/organisms/students/evaluation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Evaluation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Evaluation type="completed" />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
