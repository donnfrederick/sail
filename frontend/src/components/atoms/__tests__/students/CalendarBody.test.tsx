import CalendarBody from 'components/atoms/students/CalendarBody'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const tree = renderer
    .create(
      <Intl>
        <CalendarBody
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
          getRecommend={() => null}
          selectDate={() => null}
        />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
