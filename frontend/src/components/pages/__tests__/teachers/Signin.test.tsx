import Router from 'components/organisms/Router'
import TeachersSignin from 'components/pages/teachers/Signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersSignin />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersSignin />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
