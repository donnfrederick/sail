import InputLabel from 'components/atoms/students/InputLabel'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <InputLabel />', () => {
  const tree = renderer.create(
    <Intl>
      <InputLabel text="Email" />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
