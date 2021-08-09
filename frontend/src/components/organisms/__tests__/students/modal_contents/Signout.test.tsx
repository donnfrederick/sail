import Router from 'components/organisms/Router'
import SignoutModal from 'components/organisms/students/modal_contents/signout'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SignoutModal />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <SignoutModal text="Sail" returnPath="/" />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
