import Router from 'components/organisms/Router'
import ErrorUserMedia from 'components/organisms/students/modal_contents/error_usermedia'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ErrorUserMedia />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <ErrorUserMedia />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
