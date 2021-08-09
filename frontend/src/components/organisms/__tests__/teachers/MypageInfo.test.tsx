import Router from 'components/organisms/Router'
import MypageInfo from 'components/organisms/teachers/mypageInfo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <MypageInfo />', () => {
  const tree = renderer
    .create(
      <Router>
        <MypageInfo />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
