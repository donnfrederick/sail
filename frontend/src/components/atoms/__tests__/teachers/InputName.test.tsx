import InputName from 'components/atoms/teachers/InputName'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InputName />', () => {
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
    .create(<InputName info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
