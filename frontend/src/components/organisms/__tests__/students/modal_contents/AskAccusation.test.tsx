import Router from 'components/organisms/Router'
import AskAccusation from 'components/organisms/students/modal_contents/ask_accusation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <AskAccusation />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <AskAccusation />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
