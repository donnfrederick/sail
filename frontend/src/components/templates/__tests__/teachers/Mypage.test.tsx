import Router from 'components/organisms/Router'
import TeachersMypage from 'components/templates/teachers/Mypage'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TeachersMypage />', () => {
  const tree = renderer
    .create(
      <Router>
        <TeachersMypage />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
