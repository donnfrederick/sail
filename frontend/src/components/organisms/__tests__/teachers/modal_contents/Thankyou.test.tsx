import Router from 'components/organisms/Router'
import Thankyou from 'components/organisms/teachers/modal_contents/thankyou'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Thankyou />', () => {
  const tree = renderer
    .create(
      <Router>
        <Thankyou />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
