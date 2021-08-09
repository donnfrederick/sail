import Router from 'components/organisms/Router'
import Ready from 'components/organisms/teachers/modal_contents/ready'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Ready />', () => {
  const tree = renderer
    .create(
      <Router>
        <Ready />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
