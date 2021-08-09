import Router from 'components/organisms/Router'
import PasswordReset from 'components/organisms/teachers/password_reset'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <PasswordReset />', () => {
  const tree = renderer
    .create(
      <Router>
        <PasswordReset />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
