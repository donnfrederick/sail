import ConfirmAddFavorite from 'components/organisms/teachers/modal_contents/confirm_add_favorite/ConfirmAddFavorite'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as FavoritesActions from 'reducers/favorites'
import * as ModalActions from 'reducers/modal'

// tslint:disable-next-line
interface OuterProps {
  addFavoritedUserId: number
}

interface Props {
  addFavoritedUserId: number
  authToken: string
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    addFavoritedUserId: props.addFavoritedUserId,
    authToken: state.rootReducer.teachers.me.auth_token
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    close: ModalActions.close,
    postFavorites: FavoritesActions.postFavorites,
    setContents: ModalActions.setContents
  }
)

export default enhancer(ConfirmAddFavorite)
