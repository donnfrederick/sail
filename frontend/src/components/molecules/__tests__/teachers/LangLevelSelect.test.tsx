import LangLevelSelect from 'components/molecules/teachers/LangLevelSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <LangLevelSelect />', () => {
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
    .create(<LangLevelSelect info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
