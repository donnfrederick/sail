import LangLevelSelect from 'components/molecules/teachers/LangLevelSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <LangLevelSelect />', () => {
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
    .create(<LangLevelSelect info={info} register={() => null} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
