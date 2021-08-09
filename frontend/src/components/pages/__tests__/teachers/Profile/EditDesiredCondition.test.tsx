import Router from 'components/organisms/Router'
import ProfileEditDesiredCondition from 'components/pages/teachers/Profile/EditDesiredCondition'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ProfileEditDesiredCondition />', () => {
  const tree = renderer
    .create(
      <Router>
        <ProfileEditDesiredCondition />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
