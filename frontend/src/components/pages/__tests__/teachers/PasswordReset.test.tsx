import Router from 'components/organisms/Router'
import TeachersPasswordReset from 'components/pages/teachers/PasswordReset'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersPasswordReset />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersPasswordReset />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
