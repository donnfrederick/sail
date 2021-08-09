import Calendar from 'components/molecules/teachers/Calendar'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Calendar />', () => {
  const sampleCalendar = {
    '1': {
      is_enabled: false,
      is_reserved: false
    }
  }

  const tree = renderer
    .create(
      <Router>
        <Calendar
          calendar={sampleCalendar}
          year={2018}
          month={5}
          selectDate={() => null}
        />
      </Router>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
