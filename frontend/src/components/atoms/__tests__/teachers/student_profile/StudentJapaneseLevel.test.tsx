import StudentJapaneseLevel from 'components/atoms/teachers/user_profile/StudentJapaneseLevel'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <StudentJapaneseLevel />', () => {
  const tree = renderer.create(<StudentJapaneseLevel text={'上手'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
