import Router from 'components/organisms/Router'
import PasswordReset from 'components/organisms/students/password_reset'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PasswordReset />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <PasswordReset />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
