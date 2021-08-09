import Router from 'components/organisms/Router'
import FailSignin from 'components/organisms/teachers/modal_contents/fail_signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FailSignin />', () => {
  const tree = renderer
    .create(
      <Router>
        <FailSignin />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
