import Memo from 'components/molecules/evaluation/Memo'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <Memo />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(5)
    const memoState = React.useState<string>('foobar ほげふが')
    return (
      <Router>
        <Memo
          memoState={memoState}
          isTeacher={isTeacher}
          stepState={stepState}
          onSubmit={() => console.log('submitted')}
        />
      </Router>
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
