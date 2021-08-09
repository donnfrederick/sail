import SatisfactionEmoji from 'components/atoms/SatisfactionEmoji'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <SatisfactionEmoji />', () => {
  const satisfaction = {
    1: 0,
    2: 0,
    3: 0,
    4: 1
  }
  const tree = renderer
    .create(
      <Intl>
        <SatisfactionEmoji satisfaction={satisfaction} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
