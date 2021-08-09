import Router from 'components/organisms/Router'
import OrganizationUsers from 'components/organisms/teachers/organization_users'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationUsers />', () => {
  const tree = renderer
    .create(
      <Router>
        <OrganizationUsers />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
