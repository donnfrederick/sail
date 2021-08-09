import axios from 'axios'
import * as EnvironmentsModels from 'models/environments'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const GET_ENVIRONMENTS_REQUEST = 'environments/getEnvironmentsRequest'
const GET_ENVIRONMENTS_SUCCESS = 'environments/getEnvironmentsSuccess'
const GET_ENVIRONMENTS_FAILURE = 'environments/getEnvironmentsFailure'

interface GetEnvironmentsRequest {
  type: typeof GET_ENVIRONMENTS_REQUEST
}

interface GetEnvironmentsSuccess {
  type: typeof GET_ENVIRONMENTS_SUCCESS
  payload: {
    environments: EnvironmentsModels.Environments
  }
}

interface GetEnvironmentsFailure {
  type: typeof GET_ENVIRONMENTS_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | GetEnvironmentsRequest
  | GetEnvironmentsSuccess
  | GetEnvironmentsFailure

// Action Creator
export const getEnvironmentsRequest = (): GetEnvironmentsRequest => {
  return {
    type: GET_ENVIRONMENTS_REQUEST
  }
}

export const getEnvironmentsSuccess = (
  environments: EnvironmentsModels.Environments
): GetEnvironmentsSuccess => {
  return {
    payload: {
      environments
    },
    type: GET_ENVIRONMENTS_SUCCESS
  }
}

export const getEnvironmentsFailure = (error: any): GetEnvironmentsFailure => {
  return {
    payload: {
      error
    },
    type: GET_ENVIRONMENTS_FAILURE
  }
}

export const getEnvironments = () => (dispatch: Dispatch) => {
  dispatch(getEnvironmentsRequest())
  return axios
    .get(resolvePath.api('environments'))
    .then(response => dispatch(getEnvironmentsSuccess(response.data)))
    .catch(error => {
      dispatch(getEnvironmentsFailure(error))
      throw error
    })
}

// State
export interface State {
  environments: EnvironmentsModels.Environments
  error: any
  isFetching: boolean
}

const initialState: State = {
  environments: {
    app_socket_url: '',
    sora_api_url: '',
    sora_signaling_url: ''
  },
  error: null,
  isFetching: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_ENVIRONMENTS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_ENVIRONMENTS_SUCCESS: {
      return {
        ...state,
        environments: { ...{}, ...action.payload.environments },
        isFetching: false
      }
    }
    case GET_ENVIRONMENTS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    default: {
      return state
    }
  }
}
