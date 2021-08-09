import InputMailAddress from 'components/atoms/teachers/InputMailAddress'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputMailAddress />', () => {
  const info = {
    email: '',
    password: '',
    name: '',
    gender: '',
    picture: '',
    hobbies: [],
    purposes: [],
    desiredCondition: '',
    introduce: '',
    categories: [],
    tags: [],
    selected_tags: [],
    added_tags: []
  }
  const tree = renderer
    .create(<InputMailAddress info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
