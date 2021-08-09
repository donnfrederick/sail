import Router from 'components/organisms/Router'
import CompleteAccusation from 'components/organisms/teachers/modal_contents/complete_accusation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CompleteAccusation />', () => {
  const tree = renderer
    .create(
      <Router>
        <CompleteAccusation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
