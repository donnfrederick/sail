import Router from 'components/organisms/Router'
import Profile from 'components/organisms/students/profile'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Profile />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Profile />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
