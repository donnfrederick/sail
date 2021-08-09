import Header from 'components/molecules/teachers/Header'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Header />', () => {
  const tree = renderer
    .create(
      <Router>
        <Header text="新規登録" backToHome={true} />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
