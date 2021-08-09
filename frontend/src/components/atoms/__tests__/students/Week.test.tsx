import Week from 'components/atoms/students/Week'
import { conversations } from 'mocks/sampleData/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Week />', () => {
  const tree = renderer
    .create(
      <Intl>
        <Week reservations={conversations} start={'2018-06-09T23:59:59+09:00'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
