import Footnote from 'components/molecules/students/Footnote'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Footnote />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Footnote />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
