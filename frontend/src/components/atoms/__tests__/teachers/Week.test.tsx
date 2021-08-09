import Week from 'components/atoms/teachers/Week'
import { conversations } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Week />', () => {
  const tree = renderer
    .create(
      <Week reservations={conversations} start={'2018-06-09T23:59:59+09:00'} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
