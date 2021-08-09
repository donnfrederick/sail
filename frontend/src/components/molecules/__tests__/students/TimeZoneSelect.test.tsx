import TimeZoneSelect from 'components/molecules/students/TimeZoneSelect'
import * as sampleLocations from 'mocks/sampleData/locations'
import * as sampleData from 'mocks/sampleData/me'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TimeZoneSelect />', () => {
  const tree = renderer
    .create(
      <Intl>
        <TimeZoneSelect
          info={sampleData.info}
          register={() => null}
          timezones={sampleLocations.timezones}
          currentTimezone="Asia/Tokyo"
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
