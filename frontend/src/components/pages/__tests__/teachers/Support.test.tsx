import Router from 'components/organisms/Router'
import TeachersSupport from 'components/pages/teachers/Support'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersSupport />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersSupport />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
