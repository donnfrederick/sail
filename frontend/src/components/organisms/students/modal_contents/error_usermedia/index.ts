import ErrorUserMedia from 'components/organisms/students/modal_contents/error_usermedia/ErrorUserMedia'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {}

// tslint:disable-next-line
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {}
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(ErrorUserMedia)
