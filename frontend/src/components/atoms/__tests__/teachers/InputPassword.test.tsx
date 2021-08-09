import InputPassword from 'components/atoms/teachers/InputPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputPassword />', () => {
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
    .create(<InputPassword info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
