import UpdateRequired from 'components/organisms/students/modal_contents/update_requied/UpdateRequired'
import { connect } from 'react-redux'
import { State as RootState } from 'reducers'

// tslint:disable-next-line
interface OuterProps {
}

// tslint:disable-next-line:no-empty-interface
interface Props {}

const mapStateToProps = (state: RootState, props: OuterProps): Props => {
  return {}
}

const enhancer: any = connect(
  mapStateToProps,
  {}
)

export default enhancer(UpdateRequired)
