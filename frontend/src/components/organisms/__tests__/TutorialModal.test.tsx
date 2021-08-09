import Router from 'components/organisms/Router'
import TutorialModal from 'components/organisms/tutorial_modal'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CompleteTutorial />', () => {
  const tree = renderer
    .create(
      <Router>
        <TutorialModal />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
