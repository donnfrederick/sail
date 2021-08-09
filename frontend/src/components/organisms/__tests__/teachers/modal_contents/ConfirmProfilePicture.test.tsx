import Router from 'components/organisms/Router'
import ConfirmProfilePicture from 'components/organisms/teachers/modal_contents/confirm_profile_picture'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <EditPageButtons />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmProfilePicture />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
