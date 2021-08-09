import Router from 'components/organisms/Router'
import ConfirmTerms from 'components/organisms/students/modal_contents/confirm_terms'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ConfirmTerms />', () => {
  const tree = renderer
    .create(
      <Router>
        <ConfirmTerms />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
