import ConversationEnd from 'components/organisms/students/conversation_end/ConversationEnd'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'
import * as ReportModalActions from 'reducers/report_modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  isReportModalOpen: boolean
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    isReportModalOpen: state.rootReducer.report_modal.isOpened
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    closeReportModal: ReportModalActions.close,
    openModal: ModalActions.open,
    openReportModal: ReportModalActions.open,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(ConversationEnd)
