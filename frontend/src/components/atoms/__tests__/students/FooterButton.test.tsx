import FooterButton from 'components/atoms/students/FooterButton'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FooterButton link={'link'} icon={'icon'} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
