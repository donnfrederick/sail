import Router from 'components/organisms/Router'
import FailSignup from 'components/organisms/students/modal_contents/fail_signup'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FailSignup />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FailSignup />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
