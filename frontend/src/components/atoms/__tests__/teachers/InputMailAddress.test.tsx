import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputMailAddress />', () => {
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
    .create(<InputMailAddress info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
