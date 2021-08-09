import Favorites from 'components/organisms/students/favorites/Favorites'
import * as FavoritesModels from 'models/favorites'
import { UserProfile as User } from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'
import * as FavoritesActions from 'reducers/favorites'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  authToken: string
  favorites: User[]
  meta: FavoritesModels.Meta
  page: number
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    authToken: state.rootReducer.students.me.auth_token,
    favorites: state.rootReducer.favorites.favorites,
    meta: state.rootReducer.favorites.meta,
    page: state.rootReducer.favorites.page
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {
    forward: FavoritesActions.forward,
    getBlocks: FavoritesActions.getFavorites
  }
)

export default enhancer(Favorites)
