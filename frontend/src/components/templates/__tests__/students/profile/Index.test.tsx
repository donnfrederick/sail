import Router from 'components/organisms/Router'
import ProfileIndex from 'components/templates/students/profile/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ProfileIndex />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ProfileIndex />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
