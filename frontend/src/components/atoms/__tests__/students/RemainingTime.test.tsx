import RemainingTime from 'components/atoms/students/RemainingTime'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <RemainingTime />', () => {
  const tree = renderer
    .create(
      <Intl>
        <RemainingTime remainingTime={'2018-06-16T09:40:44Z'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
