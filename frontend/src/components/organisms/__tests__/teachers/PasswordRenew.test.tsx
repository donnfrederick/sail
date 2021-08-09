import Router from 'components/organisms/Router'
import PasswordRenew from 'components/organisms/teachers/password_renew'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <PasswordRenew />', () => {
  const tree = renderer
    .create(
      <Router>
        <PasswordRenew />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
