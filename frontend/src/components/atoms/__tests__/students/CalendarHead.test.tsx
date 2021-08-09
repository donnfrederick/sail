import CalendarHead from 'components/atoms/students/CalendarHead'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const tree = renderer
    .create(
      <Intl>
        <CalendarHead
          authToken={''}
          year={1970}
          month={1}
          changeYear={() => null}
          changeMonth={() => null}
          getCalendar={() => null}
          resetRecommendedReservations={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
