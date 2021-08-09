import Loading from 'components/organisms/loading'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Modal />', () => {
  const tree = renderer
    .create(
      <Router>
        <Loading />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
