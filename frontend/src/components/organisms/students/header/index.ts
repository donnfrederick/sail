import Header, { Theme } from 'components/organisms/students/header/Header'
import * as ConversationModels from 'models/conversation'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as ModalActions from 'reducers/modal'

interface OuterProps {
  hasCancel?: boolean
  text: string
  hasBackButton?: boolean
  returnPath?: string
  theme?: Theme
}

interface Props {
  conversation: ConversationModels.Conversation | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    conversation: state.rootReducer.conversation.conversation
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    openModal: ModalActions.open,
    setModalContents: ModalActions.setContents
  }
)

export default enhancer(Header)
