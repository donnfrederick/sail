import Router from 'components/organisms/Router'
import TeachersSignUp from 'components/templates/teachers/Signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersSignUp />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersSignUp />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
