import Router from 'components/organisms/Router'
import TeachersSignup from 'components/pages/teachers/Signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersSignup />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersSignup />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
