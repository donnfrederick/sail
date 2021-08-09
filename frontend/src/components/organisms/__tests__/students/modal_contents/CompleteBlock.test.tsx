import Router from 'components/organisms/Router'
import CompleteBlock from 'components/organisms/students/modal_contents/complete_block'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <CompleteBlock />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <CompleteBlock />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
