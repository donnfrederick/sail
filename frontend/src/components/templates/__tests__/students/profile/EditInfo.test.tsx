import Router from 'components/organisms/Router'
import ProfileEditInfo from 'components/templates/students/profile/EditInfo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ProfileEditInfo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ProfileEditInfo />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
