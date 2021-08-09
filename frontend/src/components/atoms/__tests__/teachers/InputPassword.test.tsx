import InputPassword from 'components/atoms/teachers/InputPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputPassword />', () => {
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
    .create(<InputPassword info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
