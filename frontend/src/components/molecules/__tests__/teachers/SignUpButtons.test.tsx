import SignUpButtons from 'components/molecules/teachers/SignUpButtons'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Header />', () => {
  const tree = renderer
    .create(
      <Router>
        <SignUpButtons hasChanged={true} step={1} showConfirmation={false} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
