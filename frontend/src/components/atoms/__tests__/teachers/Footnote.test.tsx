import Footnote from 'components/atoms/teachers/Footnote'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Footnote />', () => {
  const tree = renderer
    .create(
      <Router>
        <Footnote />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
