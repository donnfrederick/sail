import Router from 'components/organisms/Router'
import EditPurposes from 'components/organisms/teachers/edit_purposes'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPurposes />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditPurposes />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
