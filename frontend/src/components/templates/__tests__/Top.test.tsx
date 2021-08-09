import Router from 'components/organisms/Router'
import Top from 'components/templates/Top'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Header />', () => {
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
