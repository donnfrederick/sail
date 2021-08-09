import axios from 'axios'
import { Conversation } from 'models/conversation'
import * as ConversationHistoryModels from 'models/conversationHistory'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'conversationHistory/forward'
const CLEAR = 'conversationHistory/clear'
const GET_CONVERSATION_HISTORY_REQUEST =
  'conversationHistory/getConversationHistoryRequest'
const GET_CONVERSATION_HISTORY_SUCCESS =
  'conversationHistory/getConversationHistorySuccess'
const GET_CONVERSATION_HISTORY_FAILURE =
  'conversationHistory/getConversationHistoryFailure'

interface Forward {
  type: typeof FORWARD
}

interface Clear {
  type: typeof CLEAR
}

interface GetConversationHistoryRequest {
  type: typeof GET_CONVERSATION_HISTORY_REQUEST
}

interface GetConversationHistorySuccess {
  type: typeof GET_CONVERSATION_HISTORY_SUCCESS
  payload: {
    response: ConversationHistoryModels.GetConversationHistoryResponse
  }
}

interface GetConversationHistoryFailure {
  type: typeof GET_CONVERSATION_HISTORY_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Forward
  | Clear
  | GetConversationHistoryRequest
  | GetConversationHistorySuccess
  | GetConversationHistoryFailure

// Action Creator
export const forward = (): Forward => {
  return {
    type: FORWARD
  }
}

export const clear = (): Clear => {
  return {
    type: CLEAR
  }
}

export const getConversationHistoryRequest = (): GetConversationHistoryRequest => {
  return {
    type: GET_CONVERSATION_HISTORY_REQUEST
  }
}

export const getConversationHistorySuccess = (
  response: ConversationHistoryModels.GetConversationHistoryResponse
): GetConversationHistorySuccess => {
  return {
    payload: {
      response
    },
    type: GET_CONVERSATION_HISTORY_SUCCESS
  }
}

export const getConversationHistoryFailure = (
  error: any
): GetConversationHistoryFailure => {
  return {
    payload: {
      error
    },
    type: GET_CONVERSATION_HISTORY_FAILURE
  }
}

export const getConversationHistory = (
  authToken: string,
  parameters: ConversationHistoryModels.GetConversationHistoryRequest
) => (dispatch: Dispatch) => {
  dispatch(getConversationHistoryRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(`${resolvePath.api('history')}?${qs.stringify(parameters)}`, config)
    .then(response => dispatch(getConversationHistorySuccess(response.data)))
    .catch(error => {
      dispatch(getConversationHistoryFailure(error))
      throw error
    })
}

// State
export interface State {
  conversationHistory: Conversation[]
  error: any
  isFetching: boolean
  meta: ConversationHistoryModels.Meta
  page: number
}

const initialState: State = {
  conversationHistory: [],
  error: null,
  isFetching: false,
  meta: {
    current_page: 0,
    next_page: null,
    per_page: 0,
    previous_page: 0,
    total_entries: 0,
    total_pages: 0
  },
  page: 1
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FORWARD: {
      return {
        ...state,
        page: state.page + 1
      }
    }
    case CLEAR: {
      return {
        ...state,
        conversationHistory: [],
        page: 1
      }
    }
    case GET_CONVERSATION_HISTORY_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_CONVERSATION_HISTORY_SUCCESS: {
      return {
        ...state,
        conversationHistory: state.conversationHistory.concat(
          action.payload.response.data
        ),
        isFetching: false,
        meta: { ...{}, ...action.payload.response.meta }
      }
    }
    case GET_CONVERSATION_HISTORY_FAILURE: {
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
