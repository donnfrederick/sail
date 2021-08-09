import TimeStamp from 'components/atoms/students/TimeStamp'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TimeStamp />', () => {
  const tree = renderer
    .create(
      <Intl>
        <TimeStamp time={'2018-05-31T11:12:11'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
