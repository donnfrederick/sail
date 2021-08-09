import Router from 'components/organisms/Router'
import TeachersIndex from 'components/pages/teachers/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersIndex />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
