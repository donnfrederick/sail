import Router from 'components/organisms/Router'
import EditPassword from 'components/organisms/teachers/edit_password'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPassword />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditPassword />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
