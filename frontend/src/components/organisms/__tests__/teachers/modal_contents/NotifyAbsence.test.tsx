import Router from 'components/organisms/Router'
import NotifyAbsence from 'components/organisms/teachers/modal_contents/notify_absence'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NotifyAbsence />', () => {
  const tree = renderer
    .create(
      <Router>
        <NotifyAbsence />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
