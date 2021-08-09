import axios from 'axios'
import * as EvaluationsModels from 'models/evaluations'
import { Dispatch } from 'react-redux'
import { isTeachers } from 'utils/checkUrl'
import resolvePath from 'utils/resolvePath'

// Action
const GET_EVALUATIONS_REQUEST = 'evaluations/getEvaluationsRequest'
const GET_EVALUATIONS_SUCCESS = 'evaluations/getEvaluationsSuccess'
const GET_EVALUATIONS_FAILURE = 'evaluations/getEvaluationsFailure'
const CLEAR_EVALUATIONS = 'evaluations/clearEvaluations'

interface GetEvaluationsRequest {
  type: typeof GET_EVALUATIONS_REQUEST
}

interface GetEvaluationsSuccess {
  type: typeof GET_EVALUATIONS_SUCCESS
  payload: {
    response: EvaluationsModels.Evaluations
  }
}

interface GetEvaluationsFailure {
  type: typeof GET_EVALUATIONS_FAILURE
  payload: {
    error: any
  }
}

interface ClearEvaluations {
  type: typeof CLEAR_EVALUATIONS
}

type Action =
  | GetEvaluationsRequest
  | GetEvaluationsSuccess
  | GetEvaluationsFailure
  | ClearEvaluations

export const getEvaluationsRequest = (): GetEvaluationsRequest => {
  return {
    type: GET_EVALUATIONS_REQUEST
  }
}

export const getEvaluationsSuccess = (
  response: EvaluationsModels.Evaluations
): GetEvaluationsSuccess => {
  return {
    payload: {
      response
    },
    type: GET_EVALUATIONS_SUCCESS
  }
}

export const getEvaluationsFailure = (error: any): GetEvaluationsFailure => {
  return {
    payload: {
      error
    },
    type: GET_EVALUATIONS_FAILURE
  }
}

export const getEvaluations = (authToken: string, id: string) => (
  dispatch: Dispatch
) => {
  dispatch(getEvaluationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const partnerType = isTeachers() ? 'students' : 'teachers'
  return axios
    .get(`${resolvePath.api(`${partnerType}/${id}/evaluations`)}?`, config)
    .then(response => dispatch(getEvaluationsSuccess(response.data)))
    .catch(error => {
      dispatch(getEvaluationsFailure(error))
      throw error
    })
}

export const clearEvaluations = (): ClearEvaluations => {
  return {
    type: CLEAR_EVALUATIONS
  }
}

// State
export interface State {
  data: EvaluationsModels.Evaluations | null
  isFetching: boolean
  error: any
}

const initialState: State = {
  data: null,
  error: null,
  isFetching: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_EVALUATIONS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_EVALUATIONS_SUCCESS: {
      return {
        ...state,
        data: { ...{}, ...action.payload.response },
        isFetching: false
      }
    }
    case GET_EVALUATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case CLEAR_EVALUATIONS: {
      return {
        ...state,
        data: null,
        isFetching: false
      }
    }
    default: {
      return state
    }
  }
}
