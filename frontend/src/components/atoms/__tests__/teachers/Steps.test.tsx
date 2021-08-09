import Steps from 'components/atoms/teachers/Steps'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Steps />', () => {
  const tree = renderer.create(<Steps currentStep={1} stepCount={7} />).toJSON()
  expect(tree).toMatchSnapshot()
})
