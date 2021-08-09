import InputMailAndPassword from 'components/molecules/teachers/InputMailAndPassword'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputMailAndPassword />', () => {
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
    .create(<InputMailAndPassword info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
