import Router from 'components/organisms/Router'
import FailFetching from 'components/organisms/teachers/modal_contents/fail_fetching'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <FailFetching />', () => {
  const tree = renderer
    .create(
      <Router>
        <FailFetching />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
