import Stars from 'components/molecules/Stars'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Stars />', () => {
  const tree = renderer.create(
    <Intl>
      <Stars score={3.5} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
