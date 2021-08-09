import axios from 'axios'
import { localStorage as localStorageConstants } from 'constants/index'
import * as OrganizationsModels from 'models/organizations'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const OPEN = 'organizations/open'
const CLOSE = 'organizations/close'
const POST_SIGNIN_REQUEST = 'organizations/postSigninRequest'
const POST_SIGNIN_SUCCESS = 'organizations/postSigninSuccess'
const POST_SIGNIN_FAILURE = 'organizations/postSigninFailure'
const GET_USERS_REQUEST = 'organizations/getUsersRequest'
const GET_USERS_SUCCESS = 'organizations/getUsersSuccess'
const GET_USERS_FAILURE = 'organizations/getUsersFailure'

interface Open {
  type: typeof OPEN
}

interface Close {
  type: typeof CLOSE
}

interface PostSigninRequest {
  type: typeof POST_SIGNIN_REQUEST
}

interface PostSigninSuccess {
  type: typeof POST_SIGNIN_SUCCESS
  payload: {
    me: OrganizationsModels.Me
  }
}

interface PostSigninFailure {
  type: typeof POST_SIGNIN_FAILURE
  payload: {
    error: any
  }
}

interface GetUsersRequest {
  type: typeof GET_USERS_REQUEST
}

interface GetUsersSuccess {
  type: typeof GET_USERS_SUCCESS
  payload: {
    users: OrganizationsModels.User[]
  }
}

interface GetUsersFailure {
  type: typeof GET_USERS_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Open
  | Close
  | PostSigninRequest
  | PostSigninSuccess
  | PostSigninFailure
  | GetUsersRequest
  | GetUsersSuccess
  | GetUsersFailure

// Action Creator
export const open = (): Open => {
  return {
    type: OPEN
  }
}

export const close = (): Close => {
  return {
    type: CLOSE
  }
}

export const postSigninRequest = (): PostSigninRequest => {
  return {
    type: POST_SIGNIN_REQUEST
  }
}

export const postSigninSuccess = (
  me: OrganizationsModels.Me
): PostSigninSuccess => {
  return {
    payload: {
      me
    },
    type: POST_SIGNIN_SUCCESS
  }
}

export const postSigninFailure = (error: any): PostSigninFailure => {
  return {
    payload: {
      error
    },
    type: POST_SIGNIN_FAILURE
  }
}

export const postSignin = (request: OrganizationsModels.SigninRequest) => (
  dispatch: Dispatch
) => {
  dispatch(postSigninRequest())
  return axios
    .post(resolvePath.api('organizations/signin'), request)
    .then(response => {
      dispatch(postSigninSuccess(response.data))
      if (response.data.auth_token) {
        localStorage.setItem(
          localStorageConstants.ORGANIZATIONS_AUTH_TOKEN_KEY,
          response.data.auth_token
        )
        localStorage.setItem(
          localStorageConstants.WEB_SOCKET_TOKEN_KEY,
          response.data.web_socket_token
        )
        dispatch<any>(getUsers(response.data.auth_token))
        dispatch(open())
      }
    })
    .catch(error => {
      dispatch(postSigninFailure(error))
      throw error
    })
}

export const getUsersRequest = (): GetUsersRequest => {
  return {
    type: GET_USERS_REQUEST
  }
}

export const getUsersSuccess = (
  users: OrganizationsModels.User[]
): GetUsersSuccess => {
  return {
    payload: {
      users
    },
    type: GET_USERS_SUCCESS
  }
}

export const getUsersFailure = (error: any): GetUsersFailure => {
  return {
    payload: {
      error
    },
    type: GET_USERS_FAILURE
  }
}

export const getUsers = (authToken: string) => (dispatch: Dispatch) => {
  dispatch(getUsersRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(resolvePath.api('organizations/users'), config)
    .then(response => dispatch(getUsersSuccess(response.data)))
    .catch(error => {
      dispatch(getUsersFailure(error))
      throw error
    })
}

// State
export interface State {
  error: any
  isFetching: boolean
  isOpened: boolean
  me: OrganizationsModels.Me
  users: OrganizationsModels.User[]
}

const initialState: State = {
  error: null,
  isFetching: false,
  isOpened: true,
  me: {
    auth_token: '',
    id: 0
  },
  users: []
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        isOpened: true
      }
    }
    case CLOSE: {
      return {
        ...state,
        isOpened: false
      }
    }
    case POST_SIGNIN_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_SIGNIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        me: { ...{}, ...action.payload.me }
      }
    }
    case POST_SIGNIN_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_USERS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        users: action.payload.users
      }
    }
    case GET_USERS_FAILURE: {
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
