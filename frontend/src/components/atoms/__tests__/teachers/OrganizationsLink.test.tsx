import OrganizationsLink from 'components/atoms/teachers/OrganizationsLink'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationsLink />', () => {
  const tree = renderer
    .create(
      <Router>
        <OrganizationsLink />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
