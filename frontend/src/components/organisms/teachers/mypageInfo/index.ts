import MypageInfo from 'components/organisms/teachers/mypageInfo/MypageInfo'
import * as ConversationModels from 'models/conversation'
import * as TeachersModels from 'models/teachers'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ConversationActions from 'reducers/conversation'
import * as ModalActions from 'reducers/modal'
import * as TeachersActions from 'reducers/teachers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  info: TeachersModels.Info
  myId: number
  page: number
  reservations: ConversationModels.ConversationResponse | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.teachers.me.auth_token,
    info: state.rootReducer.teachers.info,
    myId: state.rootReducer.teachers.me.id,
    page: state.rootReducer.conversation.page,
    reservations: state.rootReducer.conversation.reservations
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    back: ConversationActions.back,
    forward: ConversationActions.forward,
    openModal: ModalActions.open,
    setModalContents: ModalActions.setContents,
    getSelectedTag: TeachersActions.getSelectedTag
  }
)

export default enhancer(MypageInfo)
