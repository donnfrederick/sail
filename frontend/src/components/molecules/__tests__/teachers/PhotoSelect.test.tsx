import PhotoSelect from 'components/molecules/teachers/PhotoSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <PhotoSelect />', () => {
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
    .create(<PhotoSelect info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
