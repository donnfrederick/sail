import axios from 'axios'
import { localStorage as localStorageConstants } from 'constants/index'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import * as UserProfileModels from 'models/userProfile'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'teachers/forward'
const BACK = 'teachers/back'
const CONFIRM = 'teachers/confirm'
const CANCEL = 'teachers/cancel'
const REGISTER = 'teachers/register'
const RESET_INFO = 'teachers/resetInfo'
const CLEAR_ERROR = 'teachers/clearError'
const SET_CURRENT_PASSWORD = 'teachers/setCurrentPassword'
const GET_HOBBIES_REQUEST = 'teachers/getHobbiesRequest'
const GET_HOBBIES_SUCCESS = 'teachers/getHobbiesSuccess'
const GET_HOBBIES_FAILURE = 'teachers/getHobbiesFailure'
const GET_PURPOSES_REQUEST = 'teachers/getPurposesRequest'
const GET_PURPOSES_SUCCESS = 'teachers/getPurposesSuccess'
const GET_PURPOSES_FAILURE = 'teachers/getPurposesFailure'
const POST_ME_REQUEST = 'teachers/postMeRequest'
const POST_ME_SUCCESS = 'teachers/postMeSuccess'
const POST_ME_FAILURE = 'teachers/postMeFailure'
const POST_SIGNIN_REQUEST = 'teachers/postSigninRequest'
const POST_SIGNIN_SUCCESS = 'teachers/postSigninSuccess'
const POST_SIGNIN_FAILURE = 'teachers/postSigninFailure'
const GET_ME_REQUEST = 'teachers/getMeRequest'
const GET_ME_SUCCESS = 'teachers/getMeSuccess'
const GET_ME_FAILURE = 'teachers/getMeFailure'
const PATCH_ME_REQUEST = 'teachers/patchMeRequest'
const PATCH_ME_SUCCESS = 'teachers/patchMeSuccess'
const PATCH_ME_FAILURE = 'teachers/patchMeFailure'
const POST_VALIDATE_REQUEST = 'teachers/postValidateRequest'
const POST_VALIDATE_SUCCESS = 'teachers/postValidateSuccess'
const POST_VALIDATE_FAILURE = 'teachers/postValidateFailure'
const DELETE_SIGNOUT_REQUEST = 'teachers/deleteSignoutRequest'
const DELETE_SIGNOUT_SUCCESS = 'teachers/deleteSignoutSuccess'
const DELETE_SIGNOUT_FAILURE = 'teachers/deleteSignoutFailure'
const POST_PASSWORD_REQUEST = 'teachers/postPasswordRequest'
const POST_PASSWORD_SUCCESS = 'teachers/postPasswordSuccess'
const POST_PASSWORD_FAILURE = 'teachers/postPasswordFailure'
const PATCH_PASSWORD_REQUEST = 'teachers/patchPasswordRequest'
const PATCH_PASSWORD_SUCCESS = 'teachers/patchPasswordSuccess'
const PATCH_PASSWORD_FAILURE = 'teachers/patchPasswordFailure'
const GET_TEACHER_REQUEST = 'teachers/getTeacherRequest'
const GET_TEACHER_SUCCESS = 'teachers/getTeacherSuccess'
const GET_TEACHER_FAILURE = 'teachers/getTeacherFailure'

interface Forward {
  type: typeof FORWARD
  step: number
}

interface Back {
  type: typeof BACK
}

interface Confirm {
  type: typeof CONFIRM
}

interface Cancel {
  type: typeof CANCEL
}

interface Register {
  type: typeof REGISTER
  payload: {
    info: TeachersModels.Info
  }
}

interface ResetInfo {
  type: typeof RESET_INFO
}

interface ClearError {
  type: typeof CLEAR_ERROR
}

interface SetCurrentPassword {
  type: typeof SET_CURRENT_PASSWORD
  payload: {
    current_password: string
  }
}

interface GetHobbiesRequest {
  type: typeof GET_HOBBIES_REQUEST
}

interface GetHobbiesSuccess {
  type: typeof GET_HOBBIES_SUCCESS
  payload: {
    hobbies: SessionsModels.Hobbie[]
  }
}

interface GetHobbiesFailure {
  type: typeof GET_HOBBIES_FAILURE
  payload: {
    error: any
  }
}

interface GetPurposesRequest {
  type: typeof GET_PURPOSES_REQUEST
}

interface GetPurposesSuccess {
  type: typeof GET_PURPOSES_SUCCESS
  payload: {
    purposes: SessionsModels.Purpose[]
  }
}

interface GetPurposesFailure {
  type: typeof GET_PURPOSES_FAILURE
  payload: {
    error: any
  }
}

interface PostMeRequest {
  type: typeof POST_ME_REQUEST
}

interface PostMeSuccess {
  type: typeof POST_ME_SUCCESS
  payload: {
    me: SessionsModels.Me
  }
}

interface PostMeFailure {
  type: typeof POST_ME_FAILURE
  payload: {
    error: any
  }
}

interface PostSigninRequest {
  type: typeof POST_SIGNIN_REQUEST
}

interface PostSigninSuccess {
  type: typeof POST_SIGNIN_SUCCESS
  payload: {
    me: SessionsModels.Me
  }
}

interface PostSigninFailure {
  type: typeof POST_SIGNIN_FAILURE
  payload: {
    error: any
  }
}

interface GetMeRequest {
  type: typeof GET_ME_REQUEST
}

interface GetMeSuccess {
  type: typeof GET_ME_SUCCESS
  payload: {
    me: SessionsModels.Me
  }
}

interface GetMeFailure {
  type: typeof GET_ME_FAILURE
  payload: {
    error: any
  }
}

interface PatchMeRequest {
  type: typeof PATCH_ME_REQUEST
}

interface PatchMeSuccess {
  type: typeof PATCH_ME_SUCCESS
  payload: {
    me: SessionsModels.Me
  }
}

interface PatchMeFailure {
  type: typeof PATCH_ME_FAILURE
  payload: {
    error: any
  }
}

interface PostValidateRequest {
  type: typeof POST_VALIDATE_REQUEST
}

interface PostValidateSuccess {
  type: typeof POST_VALIDATE_SUCCESS
  payload: {
    validation: any
  }
}

interface PostValidateFailure {
  type: typeof POST_VALIDATE_FAILURE
  payload: {
    error: any
  }
}

interface DeleteSignoutRequest {
  type: typeof DELETE_SIGNOUT_REQUEST
}

interface DeleteSignoutSuccess {
  type: typeof DELETE_SIGNOUT_SUCCESS
}

interface DeleteSignoutFailure {
  type: typeof DELETE_SIGNOUT_FAILURE
  payload: {
    error: any
  }
}

interface PostPasswordRequest {
  type: typeof POST_PASSWORD_REQUEST
}

interface PostPasswordSuccess {
  type: typeof POST_PASSWORD_SUCCESS
}

interface PostPasswordFailure {
  type: typeof POST_PASSWORD_FAILURE
  payload: {
    error: any
  }
}

interface PatchPasswordRequest {
  type: typeof PATCH_PASSWORD_REQUEST
}

interface PatchPasswordSuccess {
  type: typeof PATCH_PASSWORD_SUCCESS
}

interface PatchPasswordFailure {
  type: typeof PATCH_PASSWORD_FAILURE
  payload: {
    error: any
  }
}

interface GetTeacherRequest {
  type: typeof GET_TEACHER_REQUEST
}

interface GetTeacherSuccess {
  type: typeof GET_TEACHER_SUCCESS
  payload: {
    otherUser: UserProfileModels.UserProfile
  }
}

interface GetTeacherFailure {
  type: typeof GET_TEACHER_FAILURE
  payload: {
    error: any
  }
}

// Action Creator
type Action =
  | Forward
  | Back
  | Confirm
  | Cancel
  | Register
  | ResetInfo
  | ClearError
  | SetCurrentPassword
  | GetHobbiesRequest
  | GetHobbiesSuccess
  | GetHobbiesFailure
  | GetPurposesRequest
  | GetPurposesSuccess
  | GetPurposesFailure
  | PostMeRequest
  | PostMeSuccess
  | PostMeFailure
  | PostSigninRequest
  | PostSigninSuccess
  | PostSigninFailure
  | GetMeRequest
  | GetMeSuccess
  | GetMeFailure
  | PatchMeRequest
  | PatchMeSuccess
  | PatchMeFailure
  | PostValidateRequest
  | PostValidateSuccess
  | PostValidateFailure
  | DeleteSignoutRequest
  | DeleteSignoutSuccess
  | DeleteSignoutFailure
  | PostPasswordRequest
  | PostPasswordSuccess
  | PostPasswordFailure
  | PatchPasswordRequest
  | PatchPasswordSuccess
  | PatchPasswordFailure
  | GetTeacherRequest
  | GetTeacherSuccess
  | GetTeacherFailure

export const forward = (step?: number): Forward => {
  return {
    step: step ? step : -1,
    type: FORWARD
  }
}

export const back = (): Back => {
  return {
    type: BACK
  }
}

export const confirm = (): Confirm => {
  return {
    type: CONFIRM
  }
}

export const cancel = (): Cancel => {
  return {
    type: CANCEL
  }
}

export const register = (info: TeachersModels.Info): Register => {
  return {
    payload: {
      info
    },
    type: REGISTER
  }
}

export const resetInfo = (): ResetInfo => {
  return {
    type: RESET_INFO
  }
}

export const clearError = (): ClearError => {
  return {
    type: CLEAR_ERROR
  }
}

export const setCurrentPassword = (
  currentPassword: string
): SetCurrentPassword => {
  return {
    payload: {
      current_password: currentPassword
    },
    type: SET_CURRENT_PASSWORD
  }
}

export const getHobbiesRequest = (): GetHobbiesRequest => {
  return {
    type: GET_HOBBIES_REQUEST
  }
}
export const getHobbiesSuccess = (
  hobbies: SessionsModels.Hobbie[]
): GetHobbiesSuccess => {
  return {
    payload: {
      hobbies
    },
    type: GET_HOBBIES_SUCCESS
  }
}
export const getHobbiesFailure = (error: any): GetHobbiesFailure => {
  return {
    payload: {
      error
    },
    type: GET_HOBBIES_FAILURE
  }
}

export const getHobbies = () => {
  return (dispatch: Dispatch) => {
    dispatch(getHobbiesRequest())
    return axios
      .get(resolvePath.api('teachers/hobbies'))
      .then(response => dispatch(getHobbiesSuccess(response.data)))
      .catch(error => {
        dispatch(getHobbiesFailure(Response.error))
        throw error
      })
  }
}

export const getPurposesRequest = (): GetPurposesRequest => {
  return {
    type: GET_PURPOSES_REQUEST
  }
}
export const getPurposesSuccess = (
  purposes: SessionsModels.Purpose[]
): GetPurposesSuccess => {
  return {
    payload: {
      purposes
    },
    type: GET_PURPOSES_SUCCESS
  }
}
export const getPurposesFailure = (error: any): GetPurposesFailure => {
  return {
    payload: {
      error
    },
    type: GET_PURPOSES_FAILURE
  }
}

export const getPurposes = () => {
  return (dispatch: Dispatch) => {
    dispatch(getPurposesRequest())
    return axios
      .get(resolvePath.api('teachers/purposes'))
      .then(response => dispatch(getPurposesSuccess(response.data)))
      .catch(error => {
        dispatch(getPurposesFailure(error))
        throw new Error()
      })
  }
}

export const postMeRequest = (): PostMeRequest => {
  return {
    type: POST_ME_REQUEST
  }
}

export const postMeSuccess = (me: SessionsModels.Me): PostMeSuccess => {
  return {
    payload: {
      me
    },
    type: POST_ME_SUCCESS
  }
}

export const postMeFailure = (error: any): PostMeFailure => {
  return {
    payload: {
      error
    },
    type: POST_ME_FAILURE
  }
}

export const postMe = (teacher: TeachersModels.Teacher) => {
  return (dispatch: Dispatch) => {
    dispatch(postMeRequest())
    return axios
      .post(resolvePath.api('teachers'), teacher)
      .then(response => {
        dispatch(postMeSuccess(response.data))
        if (response.data.auth_token) {
          localStorage.setItem(
            localStorageConstants.TEACHERS_AUTH_TOKEN_KEY,
            response.data.auth_token
          )
          localStorage.setItem(
            localStorageConstants.WEB_SOCKET_TOKEN_KEY,
            response.data.web_socket_token
          )
          localStorage.setItem(
            localStorageConstants.USERS_EMAIL,
            response.data.email
          )
        }
      })
      .catch(error => {
        dispatch(postMeFailure(error))
        throw error
      })
  }
}

export const postSigninRequest = (): PostSigninRequest => {
  return {
    type: POST_SIGNIN_REQUEST
  }
}

export const postSigninSuccess = (me: SessionsModels.Me): PostSigninSuccess => {
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

export const postSignin = (signin: SessionsModels.SigninRequest) => {
  return (dispatch: Dispatch) => {
    dispatch(postSigninRequest())
    return axios
      .post(resolvePath.api('teachers/signin'), signin)
      .then(response => {
        dispatch(postSigninSuccess(response.data))
        if (response.data.auth_token) {
          localStorage.setItem(
            localStorageConstants.TEACHERS_AUTH_TOKEN_KEY,
            response.data.auth_token
          )
          localStorage.setItem(
            localStorageConstants.WEB_SOCKET_TOKEN_KEY,
            response.data.web_socket_token
          )
          localStorage.setItem(
            localStorageConstants.USERS_EMAIL,
            response.data.email
          )
        }
      })
      .catch(error => {
        dispatch(postSigninFailure(error))
        throw error
      })
  }
}

export const getMeRequest = (): GetMeRequest => {
  return {
    type: GET_ME_REQUEST
  }
}

export const getMeSuccess = (me: SessionsModels.Me): GetMeSuccess => {
  return {
    payload: {
      me
    },
    type: GET_ME_SUCCESS
  }
}

export const getMeFailure = (error: any): GetMeFailure => {
  return {
    payload: {
      error
    },
    type: GET_ME_FAILURE
  }
}

export const getMe = (authToken: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getMeRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(resolvePath.api('teachers/me'), config)
      .then(response => {
        dispatch(getMeSuccess(response.data))
        if (response.data.auth_token) {
          localStorage.setItem(
            localStorageConstants.TEACHERS_AUTH_TOKEN_KEY,
            response.data.auth_token
          )
          localStorage.setItem(
            localStorageConstants.WEB_SOCKET_TOKEN_KEY,
            response.data.web_socket_token
          )
        }
      })
      .catch(error => {
        dispatch(getMeFailure(error))
        throw error
      })
  }
}

export const patchMeRequest = (): PatchMeRequest => {
  return {
    type: PATCH_ME_REQUEST
  }
}

export const patchMeSuccess = (me: SessionsModels.Me): PatchMeSuccess => {
  return {
    payload: {
      me
    },
    type: PATCH_ME_SUCCESS
  }
}

export const patchMeFailure = (error: any): PatchMeFailure => {
  return {
    payload: {
      error
    },
    type: PATCH_ME_FAILURE
  }
}

export const patchMe = (authToken: string, changes: any) => {
  return (dispatch: Dispatch) => {
    dispatch(patchMeRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .patch(resolvePath.api('teachers/me'), changes, config)
      .then(response => {
        dispatch(patchMeSuccess(response.data))
        dispatch(push(resolvePath.page('teachers', 'profile/edit')))
      })
      .catch(error => {
        dispatch(patchMeFailure(error))
        throw error
      })
  }
}

export const postValidateRequest = (): PostValidateRequest => {
  return {
    type: POST_VALIDATE_REQUEST
  }
}

export const postValidateSuccess = (validation: any): PostValidateSuccess => {
  return {
    payload: {
      validation
    },
    type: POST_VALIDATE_SUCCESS
  }
}

export const postValidateFailure = (error: any): PostValidateFailure => {
  return {
    payload: {
      error
    },
    type: POST_VALIDATE_FAILURE
  }
}

export const postValidate = (request: TeachersModels.ValidationRequest) => (
  dispatch: Dispatch
) => {
  dispatch(postValidateRequest())
  return axios
    .post(resolvePath.api('teachers/validate'), request)
    .then(response => dispatch(postValidateSuccess(response.data)))
    .catch(error => {
      dispatch(postValidateFailure(error))
      throw error
    })
}

export const deleteSignoutRequest = (): DeleteSignoutRequest => {
  return {
    type: DELETE_SIGNOUT_REQUEST
  }
}

export const deleteSignoutSuccess = (): DeleteSignoutSuccess => {
  return {
    type: DELETE_SIGNOUT_SUCCESS
  }
}

export const deleteSignoutFailure = (error: any): DeleteSignoutFailure => {
  return {
    payload: {
      error
    },
    type: DELETE_SIGNOUT_FAILURE
  }
}

export const deleteSignout = (authToken: string) => (dispatch: Dispatch) => {
  dispatch(deleteSignoutRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  return axios
    .delete(resolvePath.api('teachers/signout'), config)
    .then(() => dispatch(deleteSignoutSuccess()))
    .catch(error => {
      dispatch(deleteSignoutFailure(error))
      throw error
    })
}

export const postPasswordRequest = (): PostPasswordRequest => {
  return {
    type: POST_PASSWORD_REQUEST
  }
}

export const postPasswordSuccess = (): PostPasswordSuccess => {
  return {
    type: POST_PASSWORD_SUCCESS
  }
}

export const postPasswordFailure = (error: any): PostPasswordFailure => {
  return {
    payload: {
      error
    },
    type: POST_PASSWORD_FAILURE
  }
}

export const postPassword = (email: string) => (dispatch: Dispatch) => {
  dispatch(postPasswordRequest())
  const request = {
    email
  }
  return axios
    .post(resolvePath.api('teachers/password'), request)
    .then(() => dispatch(postPasswordSuccess()))
    .catch(error => {
      dispatch(postPasswordFailure(error))
      throw error
    })
}

export const patchPasswordRequest = (): PatchPasswordRequest => {
  return {
    type: PATCH_PASSWORD_REQUEST
  }
}

export const patchPasswordSuccess = (): PatchPasswordSuccess => {
  return {
    type: PATCH_PASSWORD_SUCCESS
  }
}

export const patchPasswordFailure = (error: any): PatchPasswordFailure => {
  return {
    payload: {
      error
    },
    type: PATCH_PASSWORD_FAILURE
  }
}

export const patchPassword = (token: string, password: string) => (
  dispatch: Dispatch
) => {
  dispatch(patchPasswordRequest())
  const request = {
    password,
    token
  }
  return axios
    .patch(resolvePath.api('teachers/password'), request)
    .then(() => dispatch(patchPasswordSuccess()))
    .catch(error => {
      dispatch(patchPasswordFailure(error))
      throw error
    })
}

export const getTeacherRequest = (): GetTeacherRequest => {
  return {
    type: GET_TEACHER_REQUEST
  }
}

export const getTeacherSuccess = (
  otherUser: UserProfileModels.UserProfile
): GetTeacherSuccess => {
  return {
    payload: {
      otherUser
    },
    type: GET_TEACHER_SUCCESS
  }
}

export const getTeacherFailure = (error: any): GetTeacherFailure => {
  return {
    payload: {
      error
    },
    type: GET_TEACHER_FAILURE
  }
}

export const getTeacher = (
  authToken: string,
  teacherId: number,
  selfId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(getTeacherRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const getTeacherDataPromise = axios.get(
      resolvePath.api(`teachers/${teacherId}`),
      config
    )
    const getTeacherMemoPromise = axios.get(
      `teachers/${teacherId}/memos?${qs.stringify({ selfId })}`,
      config
    )
    return Promise.all([getTeacherDataPromise, getTeacherMemoPromise])
      .then(([teacherDataResponse, teacherMemoResponse]) => {
        const otherUserData: UserProfileModels.UserProfile = {
          ...teacherDataResponse.data,
          memo: teacherMemoResponse.data
        }
        dispatch(getTeacherSuccess(otherUserData))
      })
      .catch(error => {
        dispatch(getTeacherFailure(error))
        throw error
      })
  }
}

// State
export interface State {
  current_password: string
  error: any
  hobbies: SessionsModels.Hobbie[]
  info: TeachersModels.Info
  isFetching: boolean
  isPasswordRenewed: boolean
  otherUser: UserProfileModels.UserProfile | null
  purposes: SessionsModels.Purpose[]
  sentPasswordResetRequest: boolean
  step: number
  showConfirmation: boolean
  me: SessionsModels.Me
  validation: any
}

const initialInfoState: TeachersModels.Info = {
  custom_gender: '',
  desiredCondition: '',
  email: '',
  gender: '',
  hobbies: [],
  introduce: '',
  name: '',
  password: '',
  picture: '',
  preferred_name: 1,
  purposes: []
}

const initialMeState: SessionsModels.Me = {
  absence: 0,
  auth_token: '',
  birthday: '',
  conversation_level: null,
  conversations: [],
  country: '',
  custom_gender: '',
  desired_condition: 0,
  email: '',
  evaluate: {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  },
  grade: null,
  hobbies: [],
  id: 0,
  introduce: '',
  lateness: 0,
  level: null,
  location: '',
  name: '',
  name_ja: '',
  organization_device: null,
  organization_sections: [],
  organizations: [],
  picture_url: '',
  preferred_name: 1,
  purposes: [],
  rated_conversation_level: null,
  sex: 0,
  timezone: '',
  type: '',
  username: '',
  web_socket_token: ''
}

const initialState = {
  current_password: '',
  error: null,
  hobbies: [],
  info: initialInfoState,
  isFetching: false,
  isPasswordRenewed: false,
  me: initialMeState,
  otherUser: null,
  purposes: [],
  sentPasswordResetRequest: false,
  showConfirmation: false,
  step: 1,
  validation: null
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FORWARD: {
      if (action.step < 0) {
        return {
          ...state,
          step: state.step < 8 ? state.step + 1 : state.step
        }
      } else {
        return {
          ...state,
          step: action.step < 9 ? action.step : 7
        }
      }
    }
    case BACK: {
      return {
        ...state,
        step: state.step > 1 ? state.step - 1 : state.step
      }
    }
    case CONFIRM: {
      return {
        ...state,
        showConfirmation: true
      }
    }
    case CANCEL: {
      return {
        ...state,
        showConfirmation: false
      }
    }
    case REGISTER: {
      return {
        ...state,
        error: null,
        info: { ...{}, ...action.payload.info }
      }
    }
    case RESET_INFO: {
      return {
        ...state,
        info: { ...{}, ...initialInfoState },
        step: 1
      }
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null
      }
    }
    case SET_CURRENT_PASSWORD: {
      return {
        ...state,
        current_password: action.payload.current_password
      }
    }
    case GET_HOBBIES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_HOBBIES_SUCCESS: {
      return {
        ...state,
        hobbies: action.payload.hobbies,
        isFetching: false
      }
    }
    case GET_HOBBIES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_PURPOSES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_PURPOSES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        purposes: action.payload.purposes
      }
    }
    case GET_PURPOSES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_ME_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_ME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        me: { ...{}, ...action.payload.me }
      }
    }
    case POST_ME_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
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
    case GET_ME_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_ME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        me: { ...{}, ...action.payload.me }
      }
    }
    case GET_ME_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case PATCH_ME_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case PATCH_ME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        me: { ...{}, ...action.payload.me }
      }
    }
    case PATCH_ME_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_VALIDATE_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_VALIDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        validation: action.payload.validation
      }
    }
    case POST_VALIDATE_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case DELETE_SIGNOUT_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case DELETE_SIGNOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false
      }
    }
    case DELETE_SIGNOUT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_PASSWORD_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        sentPasswordResetRequest: true
      }
    }
    case POST_PASSWORD_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case PATCH_PASSWORD_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case PATCH_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isPasswordRenewed: true
      }
    }
    case PATCH_PASSWORD_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_TEACHER_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_TEACHER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        otherUser: { ...{}, ...action.payload.otherUser }
      }
    }
    case GET_TEACHER_FAILURE: {
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
