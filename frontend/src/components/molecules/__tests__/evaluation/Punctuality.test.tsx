import Punctuality from 'components/molecules/evaluation/Punctuality'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Punctuality />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(3)
    const punctualityState = React.useState<number>(4)
    return (
      <Punctuality
        punctualityState={punctualityState}
        isTeacher={isTeacher}
        stepState={stepState}
      />
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
