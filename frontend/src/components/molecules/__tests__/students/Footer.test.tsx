import Footer from 'components/molecules/students/Footer'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Footer />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <Footer />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
