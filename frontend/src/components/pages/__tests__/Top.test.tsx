import Router from 'components/organisms/Router'
import Top from 'components/pages/Top'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Top />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Top />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
