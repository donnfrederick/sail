import InterestSelect from 'components/molecules/teachers/InterestSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <InterestSelect />', () => {
  const hobbies = [
    {
      id: '',
      name: ''
    }
  ]
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
    .create(
      <InterestSelect hobbies={hobbies} info={info} register={() => null} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
