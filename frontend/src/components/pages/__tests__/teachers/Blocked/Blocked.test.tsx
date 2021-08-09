import Router from 'components/organisms/Router'
import TeachersBlocked from 'components/pages/teachers/Blocked/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersBlocked />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersBlocked />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
