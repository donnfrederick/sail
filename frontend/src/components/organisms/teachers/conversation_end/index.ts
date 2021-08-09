import ConversationEnd from 'components/organisms/teachers/conversation_end/ConversationEnd'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    isReportModalOpen: state.rootReducer.report_modal.isOpened
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(ConversationEnd)
