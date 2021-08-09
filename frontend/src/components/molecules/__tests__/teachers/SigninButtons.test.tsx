import SigninButtons from 'components/molecules/teachers/SigninButtons'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SigninButtons />', () => {
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
      <Router>
        <SigninButtons info={info} signinEvent={() => null} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
