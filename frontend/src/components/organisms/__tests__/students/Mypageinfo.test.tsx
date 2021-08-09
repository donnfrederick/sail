import Router from 'components/organisms/Router'
import Mypageinfo from 'components/organisms/students/mypageInfo'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Mypageinfo />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Mypageinfo />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
