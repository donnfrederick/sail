import SigningButtons from 'components/molecules/students/SigningButtons'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SigningButtons />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <SigningButtons />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
