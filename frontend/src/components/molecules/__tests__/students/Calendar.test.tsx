import Calendar from 'components/molecules/students/Calendar'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Calendar />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Calendar
          authToken={''}
          calendar={{
            '1': {
              is_enabled: false,
              is_reserved: false
            }
          }}
          year={1970}
          month={1}
          selectedDate={'2018-01-01'}
          changeYear={() => null}
          changeMonth={() => null}
          getCalendar={() => null}
          getRecommend={() => null}
          resetRecommendedReservations={() => null}
          selectDate={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
