import assert from 'assert'
import report_modal, * as ReportModalActions from 'reducers/report_modal'

test('report_modal/open, report_modal/close', () => {
  const initialState = report_modal(undefined, ReportModalActions.open())
  assert(initialState.isOpened === true)
  const ret = report_modal(undefined, ReportModalActions.close())
  assert(ret.isOpened === false)
})
