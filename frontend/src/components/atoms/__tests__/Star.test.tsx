import Star from 'components/atoms/Star'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Star />', () => {
  const tree = renderer
    .create(
      <Intl>
        <div>
          <Star type="full" />
          <Star type="half" />
          <Star type="empty" />
        </div>
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
