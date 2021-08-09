import Satisfaction from 'components/molecules/evaluation/Satisfaction'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Satisfaction />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(1)
    const satisfactionState = React.useState<number>(3)
    return (
      <Satisfaction
        satisfactionState={satisfactionState}
        isTeacher={isTeacher}
        stepState={stepState}
      />
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
