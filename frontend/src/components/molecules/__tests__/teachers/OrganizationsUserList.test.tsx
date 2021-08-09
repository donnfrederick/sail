import OrganizationsUserList from 'components/molecules/teachers/OrganizationsUserList'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationsUserList />', () => {
  const tree = renderer
    .create(
      <OrganizationsUserList
        teachersAuthToken={''}
        users={[]}
        getMe={() => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
