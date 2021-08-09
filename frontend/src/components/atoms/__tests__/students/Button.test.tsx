import Button from 'components/atoms/students/Button'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <FooterButton />', () => {
  const tree = renderer.create(
    <Intl>
      <Button text="" />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
