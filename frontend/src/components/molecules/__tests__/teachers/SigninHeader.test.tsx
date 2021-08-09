import SigninHeader from 'components/molecules/teachers/SigninHeader'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <SigninHeader />', () => {
  const tree = renderer
    .create(
      <Router>
        <SigninHeader text="日本の方" returnPath={'/'} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
