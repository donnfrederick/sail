import NetworkStatus from 'components/atoms/students/NetworkStatus'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <NetworkStatus />', () => {
  const tree = renderer
    .create(
      <Intl>
        <div>
          <NetworkStatus status="good" />
          <NetworkStatus status="normal" />
          <NetworkStatus status="bad" />
        </div>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
