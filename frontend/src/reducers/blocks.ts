import axios from 'axios'
import * as BlocksModels from 'models/blocks'
import { UserProfile as User } from 'models/userProfile'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'blocks/forward'
const CLEAR = 'blocks/clear'
const GET_BLOCKS_REQUEST = 'blocks/getBlocksRequest'
const GET_BLOCKS_SUCCESS = 'blocks/getBlocksSuccess'
const GET_BLOCKS_FAILURE = 'blocks/getBlocksFailure'

// 仮。実際はGET_BLOCKS_ID_REQUEST, SUCCESS, FAILUREのセットで管理するはず。
const GET_BLOCKS_ID = 'favorites/getBlocksId'
const CLEAR_BLOCKS_ID = 'favorites/clearBlocksId'

const POST_BLOCKS_REQUEST = 'blocks/postBlocksRequest'
const POST_BLOCKS_SUCCESS = 'blocks/postBlocksSuccess'
const POST_BLOCKS_FAILURE = 'blocks/postBlocksFailure'
const DELETE_BLOCKS_REQUEST = 'blocks/deleteBlocksRequest'
const DELETE_BLOCKS_SUCCESS = 'blocks/deleteBlocksSuccess'
const DELETE_BLOCKS_FAILURE = 'blocks/deleteBlocksFailure'

interface Forward {
  type: typeof FORWARD
}

interface Clear {
  type: typeof CLEAR
}

interface GetBlocksRequest {
  type: typeof GET_BLOCKS_REQUEST
}

interface GetBlocksSuccess {
  type: typeof GET_BLOCKS_SUCCESS
  payload: {
    response: BlocksModels.GetBlocksResponse
  }
}

interface GetBlocksFailure {
  type: typeof GET_BLOCKS_FAILURE
  payload: {
    error: any
  }
}

interface GetBlocksId {
  type: typeof GET_BLOCKS_ID
  payload: {
    blockedUser: User
  }
}

interface ClearBlocksId {
  type: typeof CLEAR_BLOCKS_ID
}

interface PostBlocksRequest {
  type: typeof POST_BLOCKS_REQUEST
}

interface PostBlocksSuccess {
  type: typeof POST_BLOCKS_SUCCESS
  payload: {
    blockedUser: User
  }
}

interface PostBlocksFailure {
  type: typeof POST_BLOCKS_FAILURE
  payload: {
    error: any
  }
}

interface DeleteBlocksRequest {
  type: typeof DELETE_BLOCKS_REQUEST
}

interface DeleteBlocksSuccess {
  type: typeof DELETE_BLOCKS_SUCCESS
  payload: {
    unblockedUser: User
  }
}

interface DeleteBlocksFailure {
  type: typeof DELETE_BLOCKS_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Forward
  | Clear
  | GetBlocksRequest
  | GetBlocksSuccess
  | GetBlocksFailure
  | GetBlocksId
  | ClearBlocksId
  | PostBlocksRequest
  | PostBlocksSuccess
  | PostBlocksFailure
  | DeleteBlocksRequest
  | DeleteBlocksSuccess
  | DeleteBlocksFailure

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

export const getBlocksRequest = (): GetBlocksRequest => {
  return {
    type: GET_BLOCKS_REQUEST
  }
}

export const getBlocksSuccess = (
  response: BlocksModels.GetBlocksResponse
): GetBlocksSuccess => {
  return {
    payload: {
      response
    },
    type: GET_BLOCKS_SUCCESS
  }
}

export const getBlocksFailure = (error: any): GetBlocksFailure => {
  return {
    payload: {
      error
    },
    type: GET_BLOCKS_FAILURE
  }
}

export const getBlocks = (
  authToken: string,
  parameters: BlocksModels.GetBlocksRequest
) => (dispatch: Dispatch) => {
  dispatch(getBlocksRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(`${resolvePath.api('blocks')}?${qs.stringify(parameters)}`, config)
    .then(response => dispatch(getBlocksSuccess(response.data)))
    .catch(error => {
      dispatch(getBlocksFailure(error))
      throw error
    })
}

export const getBlocksId = (blockedUser: User): GetBlocksId => {
  return {
    payload: {
      blockedUser
    },
    type: GET_BLOCKS_ID
  }
}

export const clearBlocksId = (): ClearBlocksId => {
  return {
    type: CLEAR_BLOCKS_ID
  }
}

export const postBlocksRequest = (): PostBlocksRequest => {
  return {
    type: POST_BLOCKS_REQUEST
  }
}

export const postBlocksSuccess = (blockedUser: User): PostBlocksSuccess => {
  return {
    payload: {
      blockedUser
    },
    type: POST_BLOCKS_SUCCESS
  }
}

export const postBlocksFailure = (error: any): PostBlocksFailure => {
  return {
    payload: {
      error
    },
    type: POST_BLOCKS_FAILURE
  }
}

export const postBlocks = (
  authToken: string,
  parameters: BlocksModels.PostBlocksRequest
) => (dispatch: Dispatch) => {
  dispatch(postBlocksRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .post(resolvePath.api('blocks'), parameters, config)
    .then(response => dispatch(postBlocksSuccess(response.data)))
    .catch(error => {
      dispatch(postBlocksFailure(error))
      throw error
    })
}

export const deleteBlocksRequest = (): DeleteBlocksRequest => {
  return {
    type: DELETE_BLOCKS_REQUEST
  }
}

export const deleteBlocksSuccess = (
  unblockedUser: User
): DeleteBlocksSuccess => {
  return {
    payload: {
      unblockedUser
    },
    type: DELETE_BLOCKS_SUCCESS
  }
}

export const deleteBlocksFailure = (error: any): DeleteBlocksFailure => {
  return {
    payload: {
      error
    },
    type: DELETE_BLOCKS_FAILURE
  }
}

export const deleteBlocks = (
  authToken: string,
  parameters: BlocksModels.DeleteBlocksRequest
) => (dispatch: Dispatch) => {
  dispatch(deleteBlocksRequest())
  const config = {
    data: parameters,
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .delete(resolvePath.api('blocks'), config)
    .then(response => dispatch(deleteBlocksSuccess(response.data)))
    .catch(error => {
      dispatch(deleteBlocksFailure(error))
      throw error
    })
}

// State
export interface State {
  blockedUser: User | null
  blocks: User[]
  error: any
  isFetching: boolean
  meta: BlocksModels.Meta
  page: number
  unblockedUser: User | null
}

const initialState: State = {
  blockedUser: null,
  blocks: [],
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
  page: 1,
  unblockedUser: null
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
        blocks: [],
        page: 1
      }
    }
    case GET_BLOCKS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_BLOCKS_SUCCESS: {
      return {
        ...state,
        blocks: state.blocks.concat(action.payload.response.data),
        isFetching: false,
        meta: { ...{}, ...action.payload.response.meta }
      }
    }
    case GET_BLOCKS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_BLOCKS_ID: {
      return {
        ...state,
        blockedUser: { ...{}, ...action.payload.blockedUser },
        isFetching: false
      }
    }
    case CLEAR_BLOCKS_ID: {
      return {
        ...state,
        blockedUser: null,
        isFetching: false
      }
    }
    case POST_BLOCKS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_BLOCKS_SUCCESS: {
      return {
        ...state,
        blockedUser: { ...{}, ...action.payload.blockedUser },
        isFetching: false
      }
    }
    case POST_BLOCKS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case DELETE_BLOCKS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case DELETE_BLOCKS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        unblockedUser: { ...{}, ...action.payload.unblockedUser }
      }
    }
    case DELETE_BLOCKS_FAILURE: {
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
