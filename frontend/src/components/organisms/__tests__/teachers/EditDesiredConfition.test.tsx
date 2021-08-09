import Router from 'components/organisms/Router'
import EditDesiredCondition from 'components/organisms/teachers/edit_desired_condition'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditDesiredCondition />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditDesiredCondition />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
