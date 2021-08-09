import SigninButtons from 'components/molecules/teachers/SigninButtons'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SigninButtons />', () => {
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
      <Router>
        <SigninButtons info={info} signinEvent={() => null} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
