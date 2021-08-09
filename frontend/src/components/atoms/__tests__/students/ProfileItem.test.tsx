import ProfileItem from 'components/atoms/students/ProfileItem'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ProfileItem />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ProfileItem text={'Female'} type={'gender'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
