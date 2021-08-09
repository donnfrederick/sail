import Steps from 'components/atoms/students/Steps'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { Intl } from 'components/organisms/Intl'

test('render <Steps />', () => {
  const tree = renderer.create(
    <Intl>
      <Steps currentStep={1} stepCount={4} />
    </Intl>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
