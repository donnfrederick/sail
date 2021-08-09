import FooterCalendar from 'components/atoms/students/FooterCalendar'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterCalendar />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Router>
          <FooterCalendar link={'link'} icon={'icon'} />
        </Router>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
