import RequestDetail from 'components/organisms/teachers/request_detail/RequestDetail'
import { Conversation } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  conversation: Conversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    conversation: state.rootReducer.conversation.conversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    open: ModalActions.open,
    setContents: ModalActions.setContents
  }
)

export default enhancer(RequestDetail)
