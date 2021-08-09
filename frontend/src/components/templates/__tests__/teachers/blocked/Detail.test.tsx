import Router from 'components/organisms/Router'
import TeachersBlockedDetail from 'components/templates/teachers/blocked/Detail'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersBlockedDetail />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersBlockedDetail />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
