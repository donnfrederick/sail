import Router from 'components/organisms/Router'
import TeachersIndex from 'components/templates/teachers/Index'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Header />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersIndex />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
