import RemainingTime from 'components/atoms/teachers/RemainingTime'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <RemainingTime />', () => {
  const tree = renderer
    .create(<RemainingTime remainingTime={'2018-06-16T09:40:44Z'} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
