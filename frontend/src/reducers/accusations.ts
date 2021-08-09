import axios from 'axios'
import * as AccusationsModels from 'models/accusations'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const SELECT = 'accusations/select'
const GET_ACCUSATIONS_REASONS_REQUEST =
  'accusations/getAccusationsReasonsRequest'
const GET_ACCUSATIONS_REASONS_SUCCESS =
  'accusations/getAccusationsReasonsSuccess'
const GET_ACCUSATIONS_REASONS_FAILURE =
  'accusations/getAccusationsReasonsFailure'
const POST_ACCUSATIONS_REQUEST = 'accusations/postAccusationsRequest'
const POST_ACCUSATIONS_SUCCESS = 'accusations/postAccusationsSuccess'
const POST_ACCUSATIONS_FAILURE = 'accusations/postAccusationsFailure'

interface Select {
  type: typeof SELECT
  payload: {
    selectedReasonId: number
  }
}

interface GetAccusationsReasonsRequest {
  type: typeof GET_ACCUSATIONS_REASONS_REQUEST
}

interface GetAccusationsReasonsSuccess {
  type: typeof GET_ACCUSATIONS_REASONS_SUCCESS
  payload: {
    reasons: AccusationsModels.Reason[]
  }
}

interface GetAccusationsReasonsFailure {
  type: typeof GET_ACCUSATIONS_REASONS_FAILURE
  payload: {
    error: any
  }
}

interface PostAccusationsRequest {
  type: typeof POST_ACCUSATIONS_REQUEST
}

interface PostAccusationsSuccess {
  type: typeof POST_ACCUSATIONS_SUCCESS
  payload: {
    response: AccusationsModels.AccusationsResponse
  }
}

interface PostAccusationsFailure {
  type: typeof POST_ACCUSATIONS_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Select
  | GetAccusationsReasonsRequest
  | GetAccusationsReasonsSuccess
  | GetAccusationsReasonsFailure
  | PostAccusationsRequest
  | PostAccusationsSuccess
  | PostAccusationsFailure

// Action Creator
export const select = (selectedReasonId: number): Select => {
  return {
    payload: {
      selectedReasonId
    },
    type: SELECT
  }
}

export const getAccusationsReasonsRequest = (): GetAccusationsReasonsRequest => {
  return {
    type: GET_ACCUSATIONS_REASONS_REQUEST
  }
}

export const getAccusationsReasonsSuccess = (
  reasons: AccusationsModels.Reason[]
): GetAccusationsReasonsSuccess => {
  return {
    payload: {
      reasons
    },
    type: GET_ACCUSATIONS_REASONS_SUCCESS
  }
}

export const getAccusationsReasonsFailure = (
  error: any
): GetAccusationsReasonsFailure => {
  return {
    payload: {
      error
    },
    type: GET_ACCUSATIONS_REASONS_FAILURE
  }
}

export const getAccusationsReasons = (authToken: string) => (
  dispatch: Dispatch
) => {
  dispatch(getAccusationsReasonsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(resolvePath.api('accusations/reasons'), config)
    .then(response => dispatch(getAccusationsReasonsSuccess(response.data)))
    .catch(error => {
      dispatch(getAccusationsReasonsFailure(error))
      throw error
    })
}

export const postAccusationsRequest = (): PostAccusationsRequest => {
  return {
    type: POST_ACCUSATIONS_REQUEST
  }
}

export const postAccusationsSuccess = (
  response: AccusationsModels.AccusationsResponse
): PostAccusationsSuccess => {
  return {
    payload: {
      response
    },
    type: POST_ACCUSATIONS_SUCCESS
  }
}

export const postAccusationsFailure = (error: any): PostAccusationsFailure => {
  return {
    payload: {
      error
    },
    type: POST_ACCUSATIONS_FAILURE
  }
}

export const postAccusations = (
  authToken: string,
  parameters: AccusationsModels.AccusationsRequest
) => (dispatch: Dispatch) => {
  dispatch(postAccusationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .post(resolvePath.api('accusations'), parameters, config)
    .then(response => dispatch(postAccusationsSuccess(response.data)))
    .catch(error => {
      dispatch(postAccusationsFailure(error))
      throw error
    })
}

// State
export interface State {
  error: any
  isFetching: boolean
  reasons: AccusationsModels.Reason[]
  response: AccusationsModels.AccusationsResponse | null
  selectedReasonId: number | null
}

const initialState: State = {
  error: null,
  isFetching: false,
  reasons: [],
  response: null,
  selectedReasonId: null
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SELECT: {
      return {
        ...state,
        selectedReasonId: action.payload.selectedReasonId
      }
    }
    case GET_ACCUSATIONS_REASONS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_ACCUSATIONS_REASONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        reasons: action.payload.reasons
      }
    }
    case GET_ACCUSATIONS_REASONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_ACCUSATIONS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_ACCUSATIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        response: { ...{}, ...action.payload.response }
      }
    }
    case POST_ACCUSATIONS_FAILURE: {
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
