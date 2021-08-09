import PurposeSelect from 'components/molecules/teachers/PurposeSelect'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <PurposeSelect />', () => {
  const purposes = [
    {
      id: '1',
      name: '日本語を教えたい'
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
      <PurposeSelect purposes={purposes} info={info} register={() => null} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
