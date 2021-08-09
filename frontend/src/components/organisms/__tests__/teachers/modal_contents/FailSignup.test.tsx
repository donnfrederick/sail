import Router from 'components/organisms/Router'
import FailSignup from 'components/organisms/teachers/modal_contents/fail_signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FailSignup />', () => {
  const tree = renderer
    .create(
      <Router>
        <FailSignup />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
