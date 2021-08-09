import Router from 'components/organisms/Router'
import TeachersPasswordRenew from 'components/pages/teachers/PasswordRenew'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersPasswordRenew />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersPasswordRenew />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
