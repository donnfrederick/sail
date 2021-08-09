import Router from 'components/organisms/Router'
import ErrorUserMedia from 'components/organisms/teachers/modal_contents/error_usermedia'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ErrorUserMedia />', () => {
  const tree = renderer
    .create(
      <Router>
        <ErrorUserMedia />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
