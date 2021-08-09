import GenderSelect from 'components/molecules/teachers/GenderSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <GenderSelect />', () => {
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
    .create(<GenderSelect info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
