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
    .create(
      <InterestSelect hobbies={hobbies} info={info} register={() => null} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
