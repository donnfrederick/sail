import OrganizationsUserIcon from 'components/atoms/teachers/OrganizationsUserIcon'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <OrganizationsUserIcon />', () => {
  const tree = renderer.create(<OrganizationsUserIcon src={''} />).toJSON()
  expect(tree).toMatchSnapshot()
})
