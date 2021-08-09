import Router from 'components/organisms/Router'
import CompleteBlock from 'components/organisms/teachers/modal_contents/complete_block'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <CompleteBlock />', () => {
  const tree = renderer
    .create(
      <Router>
        <CompleteBlock />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
