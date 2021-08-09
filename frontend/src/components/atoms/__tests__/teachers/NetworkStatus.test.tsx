import NetworkStatus from 'components/atoms/teachers/NetworkStatus'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <NetworkStatus />', () => {
  const tree = renderer
    .create(
      <div>
        <NetworkStatus status="good" />
        <NetworkStatus status="normal" />
        <NetworkStatus status="bad" />
      </div>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
