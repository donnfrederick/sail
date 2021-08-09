import ReportDetail from 'components/molecules/evaluation/ReportDetail'
import Router from 'components/organisms/Router'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ReportDetail />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(8)
    const blockState = React.useState<boolean>(false)
    const reportDetailState = React.useState<string>('')
    return (
      <Router>
        <ReportDetail
          reportDetailState={reportDetailState}
          blockState={blockState}
          isAlreadyBlocked={false}
          isTeacher={isTeacher}
          stepState={stepState}
        />
      </Router>
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
