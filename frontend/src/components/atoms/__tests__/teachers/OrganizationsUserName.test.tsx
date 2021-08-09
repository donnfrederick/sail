import OrganizationsUserName from 'components/atoms/teachers/OrganizationsUserName'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationsUserName />', () => {
  const tree = renderer
    .create(<OrganizationsUserName name="" isSelected={false} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
