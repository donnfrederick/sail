import TopicBalloon from 'components/atoms/TopicBalloon'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <TopicBalloon />', () => {
  const tree = renderer
    .create(
      <Intl>
        <div>
          <TopicBalloon text="Free" />
          <TopicBalloon text="Art" />
          <TopicBalloon text="Music" />
          <TopicBalloon text="Sports" />
        </div>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
