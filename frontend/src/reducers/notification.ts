import axios from 'axios'
import * as NotificationModels from 'models/notification'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'notification/forward'
const CLEAR = 'notification/clear'
const GET_NOTIFICATIONS_REQUEST = 'notification/getNotificationsRequest'
const GET_NOTIFICATIONS_SUCCESS = 'notification/getNotificationsSuccess'
const GET_NOTIFICATIONS_FAILURE = 'notification/getNotificationsFailure'
const GET_NOTIFICATIONS_ID_REQUEST = 'notification/getNotificationsIdRequest'
const GET_NOTIFICATIONS_ID_SUCCESS = 'notification/getNotificationsIdSuccess'
const GET_NOTIFICATIONS_ID_FAILURE = 'notification/getNotificationsIdFailure'

interface Forward {
  type: typeof FORWARD
}

interface Clear {
  type: typeof CLEAR
}

interface GetNotificationsRequest {
  type: typeof GET_NOTIFICATIONS_REQUEST
}

interface GetNotificationsSuccess {
  type: typeof GET_NOTIFICATIONS_SUCCESS
  payload: {
    notifications: NotificationModels.NotificationsResponse
  }
}

interface GetNotificationsFailure {
  type: typeof GET_NOTIFICATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetNotificationsIdRequest {
  type: typeof GET_NOTIFICATIONS_ID_REQUEST
}

interface GetNotificationsIdSuccess {
  type: typeof GET_NOTIFICATIONS_ID_SUCCESS
  payload: {
    notification: NotificationModels.Notification
  }
}

interface GetNotificationsIdFailure {
  type: typeof GET_NOTIFICATIONS_ID_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Forward
  | Clear
  | GetNotificationsRequest
  | GetNotificationsSuccess
  | GetNotificationsFailure
  | GetNotificationsIdRequest
  | GetNotificationsIdSuccess
  | GetNotificationsIdFailure

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

export const getNotificationsRequest = (): GetNotificationsRequest => {
  return {
    type: GET_NOTIFICATIONS_REQUEST
  }
}

export const getNotificationsSuccess = (
  notifications: NotificationModels.NotificationsResponse
): GetNotificationsSuccess => {
  return {
    payload: {
      notifications
    },
    type: GET_NOTIFICATIONS_SUCCESS
  }
}

export const getNotificationsFailure = (
  error: any
): GetNotificationsFailure => {
  return {
    payload: {
      error
    },
    type: GET_NOTIFICATIONS_FAILURE
  }
}

export const getNotifications = (
  authToken: string,
  parameters: NotificationModels.NotificationsRequest
) => {
  return (dispatch: Dispatch) => {
    dispatch(getNotificationsRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(
        `${resolvePath.api('notifications')}?${qs.stringify(parameters)}`,
        config
      )
      .then(response => dispatch(getNotificationsSuccess(response.data)))
      .catch(error => {
        dispatch(getNotificationsFailure(error))
        throw error
      })
  }
}

export const getNotificationsIdRequest = (): GetNotificationsIdRequest => {
  return {
    type: GET_NOTIFICATIONS_ID_REQUEST
  }
}

export const getNotificationsIdSuccess = (
  notification: NotificationModels.Notification
): GetNotificationsIdSuccess => {
  return {
    payload: {
      notification
    },
    type: GET_NOTIFICATIONS_ID_SUCCESS
  }
}

export const getNotificationsIdFailure = (
  error: any
): GetNotificationsIdFailure => {
  return {
    payload: {
      error
    },
    type: GET_NOTIFICATIONS_ID_FAILURE
  }
}

export const getNotificationsId = (authToken: string, id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(getNotificationsIdRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(resolvePath.api(`notifications/${id}`), config)
      .then(response => dispatch(getNotificationsIdSuccess(response.data)))
      .catch(error => {
        dispatch(getNotificationsIdFailure(error))
        throw error
      })
  }
}

export interface State {
  error: any
  isFetching: boolean
  meta: NotificationModels.Meta
  notification: NotificationModels.Notification
  notifications: NotificationModels.Notification[]
  page: number
}

export const initialState: State = {
  error: undefined,
  isFetching: false,
  meta: {
    current_page: 0,
    next_page: null,
    per_page: 0,
    previous_page: 0,
    total_entries: 0,
    total_pages: 0
  },
  notification: {
    body: '',
    conversation_id: 0,
    id: 0,
    image_url: '',
    notificated_at: '',
    notification_type: 0,
    title: ''
  },
  notifications: [],
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
        notifications: [],
        page: 1
      }
    }
    case GET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        meta: { ...{}, ...action.payload.notifications.meta },
        notifications: state.notifications.concat(
          action.payload.notifications.data
        )
      }
    }
    case GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_NOTIFICATIONS_ID_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_NOTIFICATIONS_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        notification: action.payload.notification
      }
    }
    case GET_NOTIFICATIONS_ID_FAILURE: {
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
