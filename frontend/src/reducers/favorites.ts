import axios from 'axios'
import * as FavoritesModels from 'models/favorites'
import { UserProfile as User } from 'models/userProfile'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'favorites/forward'
const CLEAR = 'favorites/clear'
const GET_FAVORITES_REQUEST = 'favorites/getFavoritesRequest'
const GET_FAVORITES_SUCCESS = 'favorites/getFavoritesSuccess'
const GET_FAVORITES_FAILURE = 'favorites/getFavoritesFailure'

// 仮。実際はGET_FAVORITES_ID_REQUEST, SUCCESS, FAILUREのセットで管理するはず。
const GET_FAVORITES_ID = 'favorites/getFavoritesId'
const CLEAR_FAVORITES_ID = 'favorites/clearFavoritesId'

const POST_FAVORITES_REQUEST = 'favorites/postFavoritesRequest'
const POST_FAVORITES_SUCCESS = 'favorites/postFavoritesSuccess'
const POST_FAVORITES_FAILURE = 'favorites/postFavoritesFailure'
const DELETE_FAVORITES_REQUEST = 'favorites/deleteFavoritesRequest'
const DELETE_FAVORITES_SUCCESS = 'favorites/deleteFavoritesSuccess'
const DELETE_FAVORITES_FAILURE = 'favorites/deleteFavoritesFailure'

interface Forward {
  type: typeof FORWARD
}

interface Clear {
  type: typeof CLEAR
}

interface GetFavoritesRequest {
  type: typeof GET_FAVORITES_REQUEST
}

interface GetFavoritesSuccess {
  type: typeof GET_FAVORITES_SUCCESS
  payload: {
    response: FavoritesModels.GetFavoritesResponse
  }
}

interface GetFavoritesFailure {
  type: typeof GET_FAVORITES_FAILURE
  payload: {
    error: any
  }
}

interface GetFavoritesId {
  type: typeof GET_FAVORITES_ID
  payload: {
    favoritedUser: User
  }
}

interface ClearFavoritesId {
  type: typeof CLEAR_FAVORITES_ID
}

interface PostFavoritesRequest {
  type: typeof POST_FAVORITES_REQUEST
}

interface PostFavoritesSuccess {
  type: typeof POST_FAVORITES_SUCCESS
  payload: {
    favoritedUser: User
  }
}

interface PostFavoritesFailure {
  type: typeof POST_FAVORITES_FAILURE
  payload: {
    error: any
  }
}

interface DeleteFavoritesRequest {
  type: typeof DELETE_FAVORITES_REQUEST
}

interface DeleteFavoritesSuccess {
  type: typeof DELETE_FAVORITES_SUCCESS
  payload: {
    unfavoritedUser: User
  }
}

interface DeleteFavoritesFailure {
  type: typeof DELETE_FAVORITES_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Forward
  | Clear
  | GetFavoritesRequest
  | GetFavoritesSuccess
  | GetFavoritesFailure
  | GetFavoritesId
  | ClearFavoritesId
  | PostFavoritesRequest
  | PostFavoritesSuccess
  | PostFavoritesFailure
  | DeleteFavoritesRequest
  | DeleteFavoritesSuccess
  | DeleteFavoritesFailure

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

export const getFavoritesRequest = (): GetFavoritesRequest => {
  return {
    type: GET_FAVORITES_REQUEST
  }
}

export const getFavoritesSuccess = (
  response: FavoritesModels.GetFavoritesResponse
): GetFavoritesSuccess => {
  return {
    payload: {
      response
    },
    type: GET_FAVORITES_SUCCESS
  }
}

export const getFavoritesFailure = (error: any): GetFavoritesFailure => {
  return {
    payload: {
      error
    },
    type: GET_FAVORITES_FAILURE
  }
}

export const getFavorites = (
  authToken: string,
  parameters: FavoritesModels.GetFavoritesRequest
) => (dispatch: Dispatch) => {
  dispatch(getFavoritesRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(`${resolvePath.api('favorites')}?${qs.stringify(parameters)}`, config)
    .then(response => dispatch(getFavoritesSuccess(response.data)))
    .catch(error => {
      dispatch(getFavoritesFailure(error))
      throw error
    })
}

export const getFavoritesId = (favoritedUser: User): GetFavoritesId => {
  return {
    payload: {
      favoritedUser
    },
    type: GET_FAVORITES_ID
  }
}

export const clearFavoritesId = (): ClearFavoritesId => {
  return {
    type: CLEAR_FAVORITES_ID
  }
}

export const postFavoritesRequest = (): PostFavoritesRequest => {
  return {
    type: POST_FAVORITES_REQUEST
  }
}

export const postFavoritesSuccess = (
  favoritedUser: User
): PostFavoritesSuccess => {
  return {
    payload: {
      favoritedUser
    },
    type: POST_FAVORITES_SUCCESS
  }
}

export const postFavoritesFailure = (error: any): PostFavoritesFailure => {
  return {
    payload: {
      error
    },
    type: POST_FAVORITES_FAILURE
  }
}

export const postFavorites = (
  authToken: string,
  parameters: FavoritesModels.PostFavoritesRequest
) => (dispatch: Dispatch) => {
  dispatch(postFavoritesRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .post(resolvePath.api('favorites'), parameters, config)
    .then(response => dispatch(postFavoritesSuccess(response.data)))
    .catch(error => {
      dispatch(postFavoritesFailure(error))
      throw error
    })
}

export const deleteFavoritesRequest = (): DeleteFavoritesRequest => {
  return {
    type: DELETE_FAVORITES_REQUEST
  }
}

export const deleteFavoritesSuccess = (
  unfavoritedUser: User
): DeleteFavoritesSuccess => {
  return {
    payload: {
      unfavoritedUser
    },
    type: DELETE_FAVORITES_SUCCESS
  }
}

export const deleteFavoritesFailure = (error: any): DeleteFavoritesFailure => {
  return {
    payload: {
      error
    },
    type: DELETE_FAVORITES_FAILURE
  }
}

export const deleteFavorites = (
  authToken: string,
  parameters: FavoritesModels.DeleteFavoritesRequest
) => (dispatch: Dispatch) => {
  dispatch(deleteFavoritesRequest())
  const config = {
    data: parameters,
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .delete(resolvePath.api('favorites'), config)
    .then(response => dispatch(deleteFavoritesSuccess(response.data)))
    .catch(error => {
      dispatch(deleteFavoritesFailure(error))
      throw error
    })
}

// State
export interface State {
  favoritedUser: User | null
  favorites: User[]
  error: any
  isFetching: boolean
  meta: FavoritesModels.Meta
  page: number
  unfavoritedUser: User | null
}

const initialState: State = {
  error: null,
  favoritedUser: null,
  favorites: [],
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
  unfavoritedUser: null
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
        favorites: [],
        page: 1
      }
    }
    case GET_FAVORITES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_FAVORITES_SUCCESS: {
      return {
        ...state,
        favorites: state.favorites.concat(action.payload.response.data),
        isFetching: false,
        meta: { ...{}, ...action.payload.response.meta }
      }
    }
    case GET_FAVORITES_ID: {
      return {
        ...state,
        favoritedUser: { ...{}, ...action.payload.favoritedUser },
        isFetching: false
      }
    }
    case CLEAR_FAVORITES_ID: {
      return {
        ...state,
        favoritedUser: null,
        isFetching: false
      }
    }
    case GET_FAVORITES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_FAVORITES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_FAVORITES_SUCCESS: {
      return {
        ...state,
        favoritedUser: { ...{}, ...action.payload.favoritedUser },
        isFetching: false
      }
    }
    case POST_FAVORITES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case DELETE_FAVORITES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case DELETE_FAVORITES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        unfavoritedUser: { ...{}, ...action.payload.unfavoritedUser }
      }
    }
    case DELETE_FAVORITES_FAILURE: {
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
