import Router from 'components/organisms/Router'
import EditPicture from 'components/organisms/teachers/edit_picture'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPicture />', () => {
  const tree = renderer
    .create(
      <Router>
        <EditPicture />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
