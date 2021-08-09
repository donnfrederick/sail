import Router from 'components/organisms/Router'
import EditName from 'components/organisms/teachers/edit_name'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditName />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditName />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
