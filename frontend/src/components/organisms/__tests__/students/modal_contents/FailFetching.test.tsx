import Router from 'components/organisms/Router'
import FailFetching from 'components/organisms/students/modal_contents/fail_fetching'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FailFetching />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FailFetching />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
