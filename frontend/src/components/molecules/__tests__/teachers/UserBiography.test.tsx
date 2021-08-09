import StudentBiography from 'components/molecules/teachers/UserBiography'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StudentBiography />', () => {
  const tree = renderer
    .create(
      <StudentBiography country={'Japan'} hobbies={[]} sex={1} purposes={[]} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
