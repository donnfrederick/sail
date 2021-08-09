import Router from 'components/organisms/Router'
import OrganizationsSignin from 'components/pages/teachers/Organizations/Signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationsSignin />', () => {
  const tree = renderer
    .create(
      <Router>
        <OrganizationsSignin />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
