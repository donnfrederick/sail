import NamePreferenceSelect from 'components/molecules/teachers/NamePreferenceSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NamePreferenceSelect />', () => {
  const info = {
    email: '',
    password: '',
    name: '',
    preferred_name: 1,
    gender: '',
    custom_gender: '',
    picture: '',
    hobbies: [],
    purposes: [],
    desiredCondition: '',
    introduce: ''
  }
  const tree = renderer
    .create(<NamePreferenceSelect info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
