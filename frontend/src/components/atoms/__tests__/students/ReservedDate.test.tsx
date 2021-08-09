import ReservedDate from 'components/atoms/students/ReservedDate'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <ReservedDate />', () => {
  const tree = renderer
    .create(
      <Intl>
        <ReservedDate start={'2018-01-01T00:00:00'} end={'2018-01-01T00:30:00'} />
      </Intl>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
