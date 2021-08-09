import Router from 'components/organisms/Router'
import TeachersPrivacy from 'components/templates/teachers/Privacy'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersPrivacy />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersPrivacy />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
