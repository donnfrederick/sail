import Router from 'components/organisms/Router'
import Ready from 'components/organisms/students/modal_contents/ready'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Ready />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Ready />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
