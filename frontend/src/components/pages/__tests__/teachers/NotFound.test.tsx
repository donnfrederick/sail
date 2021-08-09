import Router from 'components/organisms/Router'
import TeachersNotFound from 'components/pages/teachers/NotFound'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersNotFound />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersNotFound />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
