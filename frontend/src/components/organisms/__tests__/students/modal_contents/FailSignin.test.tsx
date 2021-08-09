import Router from 'components/organisms/Router'
import FailSignin from 'components/organisms/students/modal_contents/fail_signin'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FailSignin />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FailSignin />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
