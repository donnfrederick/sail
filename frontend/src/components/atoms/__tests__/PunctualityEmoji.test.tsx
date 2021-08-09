import PunctualityEmoji from 'components/atoms/PunctualityEmoji'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <PunctualityEmoji />', () => {
  const tree = renderer
    .create(
      <Intl>
        <PunctualityEmoji absence={1} lateness={1} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
