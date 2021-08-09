import Router from 'components/organisms/Router'
import PasswordRenew from 'components/organisms/students/password_renew'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PasswordRenew />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <PasswordRenew />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
