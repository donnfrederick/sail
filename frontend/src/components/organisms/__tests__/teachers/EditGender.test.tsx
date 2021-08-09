import Router from 'components/organisms/Router'
import EditGender from 'components/organisms/teachers/edit_gender'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditGender />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditGender />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
