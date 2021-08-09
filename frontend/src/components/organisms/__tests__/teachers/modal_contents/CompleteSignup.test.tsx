import Router from 'components/organisms/Router'
import CompleteSignup from 'components/organisms/teachers/modal_contents/complete_signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CompleteSignup />', () => {
  const tree = renderer
    .create(
      <Router>
        <CompleteSignup />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
