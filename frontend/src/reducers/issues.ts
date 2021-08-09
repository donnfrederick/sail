import axios from 'axios'
import * as IssuesModels from 'models/issues'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const GET_ISSUES_REQUEST = 'issues/getIssuesRequest'
const GET_ISSUES_SUCCESS = 'issues/getIssuesSuccess'
const GET_ISSUES_FAILURE = 'issues/getIssuesFailure'
const CLEAR = 'favorites/clear'

interface GetIssuesRequest {
  type: typeof GET_ISSUES_REQUEST
}

interface GetIssuesSuccess {
  type: typeof GET_ISSUES_SUCCESS
  payload: {
    response: IssuesModels.GetIssuesResponse
  }
}

interface GetIssuesFailure {
  type: typeof GET_ISSUES_FAILURE
  payload: {
    error: any
  }
}

interface Clear {
  type: typeof CLEAR
}

type Action = GetIssuesRequest | GetIssuesSuccess | GetIssuesFailure | Clear

// Action Creator

export const getIssuesRequest = (): GetIssuesRequest => {
  return {
    type: GET_ISSUES_REQUEST
  }
}

export const getIssuesSuccess = (
  response: IssuesModels.GetIssuesResponse
): GetIssuesSuccess => {
  return {
    payload: {
      response
    },
    type: GET_ISSUES_SUCCESS
  }
}

export const getIssuesFailure = (error: any): GetIssuesFailure => {
  return {
    payload: {
      error
    },
    type: GET_ISSUES_FAILURE
  }
}

export const getIssues = (authToken: string) => (dispatch: Dispatch) => {
  dispatch(getIssuesRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(`${resolvePath.api('billing/students/issues/available')}`, config)
    .then(response => {
      // window.console.log('response.data', response)
      dispatch(getIssuesSuccess(response.data))
    })
    .catch(error => {
      dispatch(getIssuesFailure(error))
      throw error
    })
}

export const clear = (): Clear => {
  return {
    type: CLEAR
  }
}

// State
export interface State {
  gracing: boolean
  issues: IssuesModels.Issue[] | null
  lang: string | null
}

const initialState: State = {
  gracing: false,
  issues: null,
  lang: null
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_ISSUES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_ISSUES_SUCCESS: {
      return {
        ...state,
        gracing: action.payload.response.gracing,
        isFetching: false,
        issues: action.payload.response.issues,
        lang: action.payload.response.lang
      }
    }
    case GET_ISSUES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case CLEAR: {
      return {
        ...state,
        issues: []
      }
    }
    default: {
      return state
    }
  }
}
