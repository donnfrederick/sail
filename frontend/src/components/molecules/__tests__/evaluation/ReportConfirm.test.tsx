import ReportConfirm from 'components/molecules/evaluation/ReportConfirm'
import Router from 'components/organisms/Router'
import * as ConversationsModels from 'models/conversation'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

test('render <ReportConfirm />', () => {
  const Tree = () => {
    const isTeacher = true
    const stepState = React.useState<number>(8)
    const blockState = React.useState<boolean>(false)
    const reportReasonState = React.useState<
      ConversationsModels.ReportReasonsUnion[]
    >([])
    const reportDetailState = React.useState<string>('')
    return (
      <Router>
        <ReportConfirm
          reportReasonState={reportReasonState}
          reportDetailState={reportDetailState}
          blockState={blockState}
          isAlreadyBlocked={false}
          isTeacher={isTeacher}
          stepState={stepState}
          onSubmit={() => {}}
        />
      </Router>
    )
  }
  expect(renderer.create(<Tree />).toJSON()).toMatchSnapshot()
})
