import Requests from 'components/organisms/teachers/requests/Requests'
import { Conversation } from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  myId: number
  teachersRequestConversations: Conversation[] | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    myId: state.rootReducer.teachers.me.id,
    teachersRequestConversations:
      state.rootReducer.conversation.teachersRequestConversations
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(Requests)
