import * as React from 'react'
import * as renderer from 'react-test-renderer'
import MonthButtons from 'components/molecules/teachers/MonthButtons'
import Router from 'components/organisms/Router'

test('render <MonthButtons />', () => {
  const tree = renderer.create(
    <Router>
      <MonthButtons
        authToken={''}
        startMonth={1}
        selectedMonth={1}
        selectedYear={1970}
        getCalendar={() => null}
        changeYear={() => null}
        changeMonth={() => null}
      />
    </Router>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
