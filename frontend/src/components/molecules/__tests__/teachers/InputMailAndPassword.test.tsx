import InputMailAndPassword from 'components/molecules/teachers/InputMailAndPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputMailAndPassword />', () => {
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
    .create(<InputMailAndPassword info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
