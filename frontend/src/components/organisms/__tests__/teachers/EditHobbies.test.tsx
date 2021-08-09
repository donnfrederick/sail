import Router from 'components/organisms/Router'
import EditHobbies from 'components/organisms/teachers/edit_hobbies'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditHobbies />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditHobbies />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
