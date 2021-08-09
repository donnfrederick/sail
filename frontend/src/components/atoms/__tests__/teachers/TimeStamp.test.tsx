import TimeStamp from 'components/atoms/teachers/TimeStamp'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <TimeStamp />', () => {
  const tree = renderer
    .create(<TimeStamp time={'2018-05-31T11:12:11'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
