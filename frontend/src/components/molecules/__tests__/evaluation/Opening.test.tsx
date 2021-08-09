import Opening from 'components/molecules/evaluation/Opening'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Opening />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(1)
    return (
      <Router>
        <Opening type="completed" isTeacher={isTeacher} stepState={stepState} />
      </Router>
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
