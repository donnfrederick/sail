import FavoritesDetail from 'components/organisms/teachers/favorites_detail/FavoritesDetail'
import { UserProfile as User } from 'models/userProfile'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

interface Props {
  favoritedUser: User | null
}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {
    favoritedUser: state.rootReducer.favorites.favoritedUser
  }
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(FavoritesDetail)
