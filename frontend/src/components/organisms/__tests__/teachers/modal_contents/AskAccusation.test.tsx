import Router from 'components/organisms/Router'
import AskAccusation from 'components/organisms/teachers/modal_contents/ask_accusation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <AskAccusation />', () => {
  const tree = renderer
    .create(
      <Router>
        <AskAccusation />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
