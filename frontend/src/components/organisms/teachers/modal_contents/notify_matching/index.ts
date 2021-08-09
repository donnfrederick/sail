import NotifyMatching from 'components/organisms/teachers/modal_contents/notify_matching/NotifyMatching'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  conversation: ConversationModels.Conversation
  path: string
}

interface Props {
  myId: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    myId: state.rootReducer.teachers.me.id
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close
  }
)

export default enhancer(NotifyMatching)
