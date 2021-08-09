import axios from 'axios'
import { localStorage as localStorageConstants } from 'constants/index'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as UserProfileModels from 'models/userProfile'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'students/forward'
const BACK = 'students/back'
const REGISTER = 'students/register'
const PHONE_REGISTER = 'students/phoneRegister'
const RESET_INFO = 'students/resetInfo'
const CLEAR_ERROR = 'students/clearError'
const GET_HOBBIES_REQUEST = 'students/getHobbiesRequest'
const GET_HOBBIES_SUCCESS = 'students/getHobbiesSuccess'
const GET_HOBBIES_FAILURE = 'students/getHobbiesFailure'
const GET_PURPOSES_REQUEST = 'students/getPurposesRequest'
const GET_PURPOSES_SUCCESS = 'students/getPurposesSuccess'
const GET_PURPOSES_FAILURE = 'students/getPurposesFailure'
const GET_CATEGORIES_REQUEST = 'students/getCategoriesRequest'
const GET_CATEGORIES_SUCCESS = 'students/getCategoriesSuccess'
const GET_CATEGORIES_FAILURE = 'students/getCategoriesFailure'
const GET_TAGS_REQUEST = 'students/getTagsRequest'
const GET_TAGS_SUCCESS = 'students/getTagsSuccess'
const GET_TAGS_FAILURE = 'students/getTagsFailure'
const POST_TAG_REQUEST = 'students/postTagRequest'
const POST_TAG_SUCCESS = 'students/postTagSuccess'
const POST_TAG_FAILURE = 'students/postTagFailure'
const POST_ADDED_TAG_REQUEST = 'students/postAddedTagRequest'
const POST_ADDED_TAG_SUCCESS = 'students/postAddedTagSuccess'
const POST_ADDED_TAG_FAILURE = 'students/postAddedTagFailure'
const POST_SELECTED_TAG_REQUEST = 'students/postSelectedTagRequest'
const POST_SELECTED_TAG_SUCCESS = 'students/postSelectedTagSuccess'
const POST_SELECTED_TAG_FAILURE = 'students/postSelectedTagFailure'
const GET_SELECTED_TAG_REQUEST = 'students/getSelectedTagRequest'
const GET_SELECTED_TAG_SUCCESS = 'students/getSelectedTagSuccess'
const GET_SELECTED_TAG_FAILURE = 'students/getSelectedTagFailure'
const POST_ME_REQUEST = 'students/postMeRequest'
const POST_ME_SUCCESS = 'students/postMeSuccess'
const POST_ME_FAILURE = 'students/postMeFailure'
const POST_SIGNIN_REQUEST = 'students/postSigninRequest'
const POST_SIGNIN_SUCCESS = 'students/postSigninSuccess'
const POST_SIGNIN_FAILURE = 'students/postSigninFailure'
const GET_ME_REQUEST = 'students/getMeRequest'
const GET_ME_SUCCESS = 'students/getMeSuccess'
const GET_ME_FAILURE = 'students/getMeFailure'
const GET_PK_REQUEST = 'students/getPkRequest'
const GET_PK_SUCCESS = 'students/getPkSuccess'
const GET_PK_FAILURE = 'students/getPkFailure'
const GET_PACKAGES_REQUEST = 'students/getPackagesRequest'
const GET_PACKAGES_SUCCESS = 'students/getPackagesSuccess'
const GET_PACKAGES_FAILURE = 'students/getPackagesFailure'
const PATCH_ME_REQUEST = 'students/patchMeRequest'
const PATCH_ME_SUCCESS = 'students/patchMeSuccess'
const PATCH_ME_FAILURE = 'students/patchMeFailure'
const POST_PHONE_AUTHENTICATION_REQUEST =
  'students/postPhoneAuthenticationRequest'
const POST_PHONE_AUTHENTICATION_SUCCESS =
  'students/postPhoneAuthenticationSuccess'
const POST_PHONE_CODE_VALIDATION_REQUEST =
  'students/postPhoneCodeValidationRequest'
const POST_PHONE_CODE_VALIDATION_SUCCESS =
  'students/postPhoneCodeValidationSuccess'
const POST_VALIDATE_REQUEST = 'students/postValidateRequest'
const POST_VALIDATE_SUCCESS = 'students/postValidateSuccess'
const POST_VALIDATE_FAILURE = 'students/postValidateFailure'
const DELETE_SIGNOUT_REQUEST = 'students/deleteSignoutRequest'
const DELETE_SIGNOUT_SUCCESS = 'students/deleteSignoutSuccess'
const DELETE_SIGNOUT_FAILURE = 'students/deleteSignoutFailure'
const POST_PASSWORD_REQUEST = 'students/postPasswordRequest'
const POST_PASSWORD_SUCCESS = 'students/postPasswordSuccess'
const POST_PASSWORD_FAILURE = 'students/postPasswordFailure'
const POST_ISSUE_REQUEST = 'students/postIssueRequest'
const POST_ISSUE_SUCCESS = 'students/postIssueSuccess'
const POST_ISSUE_FAILURE = 'students/postIssueFailure'
const PATCH_PASSWORD_REQUEST = 'students/patchPasswordRequest'
const PATCH_PASSWORD_SUCCESS = 'students/patchPasswordSuccess'
const PATCH_PASSWORD_FAILURE = 'students/patchPasswordFailure'
const GET_STUDENT_REQUEST = 'students/getStudentRequest'
const GET_STUDENT_SUCCESS = 'students/getStudentSuccess'
const GET_STUDENT_FAILURE = 'students/getStudentFailure'

interface Forward {
  type: typeof FORWARD
  step: number
}

interface Back {
  type: typeof BACK
}

interface Register {
  type: typeof REGISTER
  payload: {
    info: StudentsModels.Info
  }
}

interface PhoneRegister {
  type: typeof PHONE_REGISTER
  payload: {
    sms: StudentsModels.PhoneCodeValidationRequest
  }
}

interface ResetInfo {
  type: typeof RESET_INFO
}

interface ClearError {
  type: typeof CLEAR_ERROR
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

interface GetCategoriesRequest {
  type: typeof GET_CATEGORIES_REQUEST
}

interface GetCategoriesSuccess {
  type: typeof GET_CATEGORIES_SUCCESS
  payload: {
    categories: SessionsModels.Category[]
  }
}

interface GetCategoriesFailure {
  type: typeof GET_CATEGORIES_FAILURE
  payload: {
    error: any
  }
}

interface GetTagsRequest {
  type: typeof GET_TAGS_REQUEST
}

interface GetTagsSuccess {
  type: typeof GET_TAGS_SUCCESS
  payload: {
    tags: SessionsModels.Tag[]
  }
}

interface GetTagsFailure {
  type: typeof GET_TAGS_FAILURE
  payload: {
    error: any
  }
}

interface PostTagRequest {
  type: typeof POST_TAG_REQUEST
}

interface PostTagSuccess {
  type: typeof POST_TAG_SUCCESS
  payload: {
    tags: SessionsModels.Tag[]
  }
}

interface PostTagFailure {
  type: typeof POST_TAG_FAILURE
  payload: {
    error: any
  }
}

interface PostAddedTagRequest {
  type: typeof POST_ADDED_TAG_REQUEST
}

interface PostAddedTagSuccess {
  type: typeof POST_ADDED_TAG_SUCCESS
  payload: {
    added_tags: SessionsModels.AddedTag[]
  }
}

interface PostAddedTagFailure {
  type: typeof POST_ADDED_TAG_FAILURE
  payload: {
    error: any
  }
}

interface PostSelectedTagRequest {
  type: typeof POST_SELECTED_TAG_REQUEST
}

interface PostSelectedTagSuccess {
  type: typeof POST_SELECTED_TAG_SUCCESS
  payload: {
    selected_tags: SessionsModels.SelectedTag[]
  }
}

interface PostSelectedTagFailure {
  type: typeof POST_SELECTED_TAG_FAILURE
  payload: {
    error: any
  }
}

interface GetSelectedTagRequest {
  type: typeof GET_SELECTED_TAG_REQUEST
}

interface GetSelectedTagSuccess {
  type: typeof GET_SELECTED_TAG_SUCCESS
  payload: {
    selected_tags: SessionsModels.SelectedTag[]
  }
}

interface GetSelectedTagFailure {
  type: typeof GET_SELECTED_TAG_FAILURE
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

interface GetPkRequest {
  type: typeof GET_PK_REQUEST
}

interface GetPkSuccess {
  type: typeof GET_PK_SUCCESS
  payload: {
    key: string
  }
}

interface GetPkFailure {
  type: typeof GET_PK_FAILURE
  payload: {
    error: any
  }
}

interface GetPackagesRequest {
  type: typeof GET_PACKAGES_REQUEST
}

interface GetPackagesSuccess {
  type: typeof GET_PACKAGES_SUCCESS
  payload: {
    key: string
  }
}

interface GetPackagesFailure {
  type: typeof GET_PACKAGES_FAILURE
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

interface PostPhoneAuthenticationRequest {
  type: typeof POST_PHONE_AUTHENTICATION_REQUEST
}

interface PostPhoneAuthenticationSuccess {
  type: typeof POST_PHONE_AUTHENTICATION_SUCCESS
  payload: {
    sms: StudentsModels.PhoneAuthenticationRequest
  }
}

interface PostPhoneCodeValidationRequest {
  type: typeof POST_PHONE_CODE_VALIDATION_REQUEST
}

interface PostPhoneCodeValidationSuccess {
  type: typeof POST_PHONE_CODE_VALIDATION_SUCCESS
  payload: {
    sms: StudentsModels.PhoneAuthenticationRequest
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

interface PostIssueRequest {
  type: typeof POST_ISSUE_REQUEST
}

interface PostIssueSuccess {
  type: typeof POST_ISSUE_SUCCESS
}

interface PostIssueFailure {
  type: typeof POST_ISSUE_FAILURE
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

interface GetStudentRequest {
  type: typeof GET_STUDENT_REQUEST
}

interface GetStudentSuccess {
  type: typeof GET_STUDENT_SUCCESS
  payload: {
    otherUser: UserProfileModels.UserProfile
  }
}

interface GetStudentFailure {
  type: typeof GET_STUDENT_FAILURE
  payload: {
    error: any
  }
}
// Action Creator
type Action =
  | Forward
  | Back
  | Register
  | ResetInfo
  | ClearError
  | GetHobbiesRequest
  | GetHobbiesSuccess
  | GetHobbiesFailure
  | GetPurposesRequest
  | GetPurposesSuccess
  | GetPurposesFailure
  | GetCategoriesRequest
  | GetCategoriesSuccess
  | GetCategoriesFailure
  | GetTagsRequest
  | GetTagsSuccess
  | GetTagsFailure
  | PostTagRequest
  | PostTagSuccess
  | PostTagFailure
  | PostAddedTagRequest
  | PostAddedTagSuccess
  | PostAddedTagFailure
  | PostSelectedTagRequest
  | PostSelectedTagSuccess
  | PostSelectedTagFailure
  | GetSelectedTagRequest
  | GetSelectedTagSuccess
  | GetSelectedTagFailure
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
  | PostIssueRequest
  | PostIssueSuccess
  | PostIssueFailure
  | PatchPasswordRequest
  | PatchPasswordSuccess
  | PatchPasswordFailure
  | GetStudentRequest
  | GetStudentSuccess
  | GetStudentFailure

// forwardに引数が渡されていたら、その数値を返す。引数なしで呼ばれたら-1を返す
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

export const register = (info: StudentsModels.Info): Register => {
  return {
    payload: {
      info
    },
    type: REGISTER
  }
}

export const phoneRegister = (
  sms: StudentsModels.PhoneCodeValidationRequest
): PhoneRegister => {
  return {
    payload: {
      sms
    },
    type: PHONE_REGISTER
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
      .get(resolvePath.api('students/hobbies'))
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
      .get(resolvePath.api('students/purposes'))
      .then(response => dispatch(getPurposesSuccess(response.data)))
      .catch(error => {
        dispatch(getPurposesFailure(error))
        throw error
      })
  }
}

export const getCategoriesRequest = (): GetCategoriesRequest => {
  return {
    type: GET_CATEGORIES_REQUEST
  }
}
export const getCategoriesSuccess = (
  categories: SessionsModels.Category[]
): GetCategoriesSuccess => {
  return {
    payload: {
      categories
    },
    type: GET_CATEGORIES_SUCCESS
  }
}
export const getCategoriesFailure = (error: any): GetCategoriesFailure => {
  return {
    payload: {
      error
    },
    type: GET_CATEGORIES_FAILURE
  }
}

export const getCategories = () => {
  return (dispatch: Dispatch) => {
    dispatch(getCategoriesRequest())
    return axios
      .get(resolvePath.api('students/categories'))
      .then(response => dispatch(getCategoriesSuccess(response.data)))
      .catch(error => {
        dispatch(getCategoriesFailure(error))
        throw error
      })
  }
}

export const getTagsRequest = (): GetTagsRequest => {
  return {
    type: GET_TAGS_REQUEST
  }
}
export const getTagsSuccess = (tags: SessionsModels.Tag[]): GetTagsSuccess => {
  return {
    payload: {
      tags
    },
    type: GET_TAGS_SUCCESS
  }
}
export const getTagsFailure = (error: any): GetTagsFailure => {
  return {
    payload: {
      error
    },
    type: GET_TAGS_FAILURE
  }
}

export const getTags = () => {
  return (dispatch: Dispatch) => {
    dispatch(getTagsRequest())
    return axios
      .get(resolvePath.api('students/tags'))
      .then(response => dispatch(getTagsSuccess(response.data)))
      .catch(error => {
        dispatch(getTagsFailure(error))
        throw error
      })
  }
}

export const postTagRequest = (): PostTagRequest => {
  return {
    type: POST_TAG_REQUEST
  }
}
export const postTagSuccess = (tags: SessionsModels.Tag[]): PostTagSuccess => {
  return {
    payload: {
      tags
    },
    type: POST_TAG_SUCCESS
  }
}
export const postTagFailure = (error: any): PostTagFailure => {
  return {
    payload: {
      error
    },
    type: POST_TAG_FAILURE
  }
}

export const postTag = (category: number, name: string, language: string) => (
  dispatch: Dispatch
) => {
  dispatch(postTagRequest())
  const request = {
    category_id: category,
    name_en: name,
    lang: language
  }
  return axios
    .get(`${resolvePath.api('students/add_tag')}?${qs.stringify(request)}`)
    .then(response => dispatch(postTagSuccess(response.data)))
    .catch(error => {
      dispatch(postTagFailure(error))
      throw error
    })
}

export const postAddedTagRequest = (): PostAddedTagRequest => {
  return {
    type: POST_ADDED_TAG_REQUEST
  }
}
export const postAddedTagSuccess = (
  added_tags: SessionsModels.AddedTag[]
): PostAddedTagSuccess => {
  return {
    payload: {
      added_tags
    },
    type: POST_ADDED_TAG_SUCCESS
  }
}
export const postAddedTagFailure = (error: any): PostAddedTagFailure => {
  return {
    payload: {
      error
    },
    type: POST_ADDED_TAG_FAILURE
  }
}

export const postAddedTag = (
  category: number,
  name: string,
  language: string
) => (dispatch: Dispatch) => {
  dispatch(postAddedTagRequest())
  const request = {
    category_id: category,
    name_en: name,
    lang: language
  }
  return axios
    .get(`${resolvePath.api('students/added_tag')}?${qs.stringify(request)}`)
    .then(response => dispatch(postAddedTagSuccess(response.data)))
    .catch(error => {
      dispatch(postAddedTagFailure(error))
      throw error
    })
}

export const deleteAddedTag = () => {
  return (dispatch: Dispatch) => {
    dispatch(getTagsRequest())
    return axios
      .get(resolvePath.api('students/delete_added_tags'))
      .then(response => dispatch(postAddedTagSuccess(response.data)))
      .catch(error => {
        dispatch(getTagsFailure(error))
        throw error
      })
  }
}

export const deleteAddedTagsRequest = (): GetTagsRequest => {
  return {
    type: GET_TAGS_REQUEST
  }
}

export const postSelectedTagRequest = (): PostSelectedTagRequest => {
  return {
    type: POST_SELECTED_TAG_REQUEST
  }
}
export const postSelectedTagSuccess = (
  selected_tags: SessionsModels.SelectedTag[]
): PostSelectedTagSuccess => {
  return {
    payload: {
      selected_tags
    },
    type: POST_SELECTED_TAG_SUCCESS
  }
}
export const postSelectedTagFailure = (error: any): PostSelectedTagFailure => {
  return {
    payload: {
      error
    },
    type: POST_SELECTED_TAG_FAILURE
  }
}

export const postSelectedTag = (tag: number, email: string, name: string) => (
  dispatch: Dispatch
) => {
  dispatch(postSelectedTagRequest())
  const request = {
    tag_id: tag,
    user_email: email,
    tag_name: name
  }
  return axios
    .get(
      `${resolvePath.api('students/add_selected_tag')}?${qs.stringify(request)}`
    )
    .then(response => dispatch(postSelectedTagSuccess(response.data)))
    .catch(error => {
      dispatch(postSelectedTagFailure(error))
      throw error
    })
}

export const getSelectedTagRequest = (): GetSelectedTagRequest => {
  return {
    type: GET_SELECTED_TAG_REQUEST
  }
}

export const getSelectedTagSuccess = (
  selected_tags: SessionsModels.SelectedTag[]
): GetSelectedTagSuccess => {
  return {
    payload: {
      selected_tags
    },
    type: GET_SELECTED_TAG_SUCCESS
  }
}

export const getSelectedTagFailure = (error: any): GetSelectedTagFailure => {
  return {
    payload: {
      error
    },
    type: GET_SELECTED_TAG_FAILURE
  }
}

export const getSelectedTag = (email: string) => (dispatch: Dispatch) => {
  dispatch(getSelectedTagRequest())
  const request = {
    user_email: email
  }
  return axios
    .get(
      `${resolvePath.api('students/getselectedtags')}?${qs.stringify(request)}`
    )
    .then(response => dispatch(getSelectedTagSuccess(response.data)))
    .catch(error => {
      dispatch(getSelectedTagFailure(error))
      throw error
    })
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

export const postMe = (student: StudentsModels.Student) => {
  return (dispatch: Dispatch) => {
    dispatch(postMeRequest())
    return axios
      .post(resolvePath.api('students'), student)
      .then(response => {
        dispatch(postMeSuccess(response.data))
        if (response.data.auth_token) {
          localStorage.setItem(
            localStorageConstants.STUDENTS_AUTH_TOKEN_KEY,
            response.data.auth_token
          )
          localStorage.setItem(
            localStorageConstants.WEB_SOCKET_TOKEN_KEY,
            response.data.web_socket_token
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
      .post(resolvePath.api('students/signin'), signin)
      .then(response => {
        dispatch(postSigninSuccess(response.data))
        if (response.data.auth_token) {
          localStorage.setItem(
            localStorageConstants.STUDENTS_AUTH_TOKEN_KEY,
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

export const getPkRequest = (): GetPkRequest => {
  return {
    type: GET_PK_REQUEST
  }
}

export const getPkSuccess = (key: string): GetPkSuccess => {
  return {
    payload: {
      key
    },
    type: GET_PK_SUCCESS
  }
}

export const getPkFailure = (error: any): GetPkFailure => {
  return {
    payload: {
      error
    },
    type: GET_PK_FAILURE
  }
}

export const getPk = (authToken: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getPkRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(resolvePath.api('issues/pk'), config)
      .then(response => {
        dispatch(getPkSuccess(response.data))
        localStorage.setItem(
          localStorageConstants.STRIPE_PUBLIC_KEY,
          response.data
        )
      })
      .catch(error => {
        dispatch(getPkFailure(error))
        throw error
      })
  }
}

export const getPackagesRequest = (): GetPackagesRequest => {
  return {
    type: GET_PACKAGES_REQUEST
  }
}

export const getPackagesSuccess = (key: string): GetPackagesSuccess => {
  return {
    payload: {
      key
    },
    type: GET_PACKAGES_SUCCESS
  }
}

export const getPackagesFailure = (error: any): GetPackagesFailure => {
  return {
    payload: {
      error
    },
    type: GET_PACKAGES_FAILURE
  }
}

export const getPackages = (authToken: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getPackagesRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(resolvePath.api('issues/packages'), config)
      .then(response => {
        dispatch(getPackagesSuccess(response.data))
        localStorage.setItem(
          localStorageConstants.PACKAGE_PRICE,
          response.data.discounted_price
        )
        localStorage.setItem(localStorageConstants.PACKAGE_ID, response.data.id)
      })
      .catch(error => {
        dispatch(getPackagesFailure(error))
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
      .get(resolvePath.api('students/me'), config)
      .then(response => {
        dispatch(getMeSuccess(response.data))
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

export const patchMe = (authToken: string, changes: any) => (
  dispatch: Dispatch
) => {
  dispatch(patchMeRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .patch(resolvePath.api('students/me'), changes, config)
    .then(response => {
      dispatch(patchMeSuccess(response.data))
      dispatch(push(resolvePath.page('students', 'menu')))
    })
    .catch(error => {
      dispatch(patchMeFailure(error))
      throw error
    })
}

export const postPhoneAuthenticationRequest = (): PostPhoneAuthenticationRequest => {
  return {
    type: POST_PHONE_AUTHENTICATION_REQUEST
  }
}

export const postPhoneAuthenticationSuccess = (
  sms: StudentsModels.PhoneAuthenticationRequest
): PostPhoneAuthenticationSuccess => {
  return {
    payload: {
      sms
    },
    type: POST_PHONE_AUTHENTICATION_SUCCESS
  }
}

export const postPhoneAuthentication = (
  request: StudentsModels.PhoneAuthenticationRequest
) => (dispatch: Dispatch) => {
  dispatch(postPhoneAuthenticationRequest())
  return axios
    .post(resolvePath.api('phone_authentication'), request)
    .then(response => {
      dispatch(postPhoneAuthenticationSuccess(response.data))
    })
    .catch(error => {
      dispatch(postValidateFailure(error))
      throw error
    })
}

export const postPhoneCodeValidationRequest = (): PostPhoneCodeValidationRequest => {
  return {
    type: POST_PHONE_CODE_VALIDATION_REQUEST
  }
}

export const postPhoneCodeValidationSuccess = (
  sms: StudentsModels.PhoneAuthenticationRequest
): PostPhoneCodeValidationSuccess => {
  return {
    payload: {
      sms
    },
    type: POST_PHONE_CODE_VALIDATION_SUCCESS
  }
}

export const postPhoneCodeValidation = (
  request: StudentsModels.PhoneCodeValidationRequest
) => (dispatch: Dispatch) => {
  dispatch(postPhoneCodeValidationRequest())
  return axios
    .patch(resolvePath.api('phone_authentication'), request)
    .then(response => dispatch(postPhoneCodeValidationSuccess(response.data)))
    .catch(error => {
      dispatch(postValidateFailure(error))
      throw error
    })
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

export const postValidate = (request: StudentsModels.ValidationRequest) => (
  dispatch: Dispatch
) => {
  dispatch(postValidateRequest())
  return axios
    .post(resolvePath.api('students/validate'), request)
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
    .delete(resolvePath.api('students/signout'), config)
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
    .post(resolvePath.api('students/password'), request)
    .then(() => dispatch(postPasswordSuccess()))
    .catch(error => {
      dispatch(postPasswordFailure(error))
      throw error
    })
}

export const postIssueRequest = (): PostIssueRequest => {
  return {
    type: POST_ISSUE_REQUEST
  }
}

export const postIssueSuccess = (): PostIssueSuccess => {
  return {
    type: POST_ISSUE_SUCCESS
  }
}

export const postIssueFailure = (error: any): PostIssueFailure => {
  return {
    payload: {
      error
    },
    type: POST_ISSUE_FAILURE
  }
}

export const postIssue = (paymentData: any, authToken: string) => (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  dispatch(postIssueRequest())
  return axios
    .post(resolvePath.api('students/charge'), paymentData, config)
    .then(() => dispatch(postIssueSuccess()))
    .catch(error => {
      dispatch(postIssueFailure(error))
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
    .patch(resolvePath.api('students/password'), request)
    .then(() => dispatch(patchPasswordSuccess()))
    .catch(error => {
      dispatch(patchPasswordFailure(error))
      throw error
    })
}

export const getStudentRequest = (): GetStudentRequest => {
  return {
    type: GET_STUDENT_REQUEST
  }
}

export const getStudentSuccess = (
  otherUser: UserProfileModels.UserProfile
): GetStudentSuccess => {
  return {
    payload: {
      otherUser
    },
    type: GET_STUDENT_SUCCESS
  }
}

export const getStudentFailure = (error: any): GetStudentFailure => {
  return {
    payload: {
      error
    },
    type: GET_STUDENT_FAILURE
  }
}

export const getStudent = (
  authToken: string,
  studentId: number,
  selfId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(getStudentRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const getStudentDataPromise = axios.get(
      resolvePath.api(`students/${studentId}`),
      config
    )
    const getStudentMemoPromise = axios.get(
      resolvePath.api(
        `students/${studentId}/memos?${qs.stringify({ selfId })}`
      ),
      config
    )
    return Promise.all([getStudentDataPromise, getStudentMemoPromise])
      .then(([studentDataResponse, studentMemoResponse]) => {
        const otherUserData: UserProfileModels.UserProfile = {
          ...studentDataResponse.data,
          memos: studentMemoResponse.data
        }
        dispatch(getStudentSuccess(otherUserData))
      })
      .catch(error => {
        dispatch(getStudentFailure(error))
        throw error
      })
  }
}

// State
export interface State {
  error: null
  hobbies: SessionsModels.Hobbie[]
  info: StudentsModels.Info
  isFetching: boolean
  isPasswordRenewed: boolean
  me: SessionsModels.Me
  otherUser: UserProfileModels.UserProfile | null
  purposes: SessionsModels.Purpose[]
  categories: SessionsModels.Category[]
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  selected_tags: SessionsModels.SelectedTag[]
  sentPasswordResetRequest: boolean
  sms: StudentsModels.PhoneCodeValidationRequest
  step: number
  validation: any
}

const initialInfoState: StudentsModels.Info = {
  conversation_level: 0,
  country: '',
  current_password: '',
  desired_condition: 0,
  email: '',
  gender: 0,
  hobbies: [],
  introduce: '',
  level: 0,
  name: '',
  name_ja: '',
  password: '',
  picture: '',
  purposes: [],
  categories: [],
  tags: [],
  selected_tags: [],
  added_tags: [],
  timezone: '',
  sysp_nl: ''
}

const initialMeState: SessionsModels.Me = {
  absence: 0,
  auth_token: '',
  birthday: '',
  conversation_level: 0,
  conversations: [],
  country: '',
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
  level: 0,
  location: '',
  name: '',
  name_ja: '',
  organization_device: null,
  organization_sections: [],
  organizations: [],
  picture_url: '',
  purposes: [],
  rated_conversation_level: null,
  sex: 0,
  timezone: '',
  type: '',
  username: '',
  web_socket_token: ''
}

const initialSmsState: StudentsModels.PhoneCodeValidationRequest = {
  code: '',
  country: '',
  phone_number: ''
}

const initialState = {
  error: null,
  hobbies: [],
  info: initialInfoState,
  isFetching: false,
  isPasswordRenewed: false,
  me: initialMeState,
  otherUser: null,
  purposes: [],
  categories: [],
  tags: [],
  added_tags: [],
  selected_tags: [],
  sentPasswordResetRequest: false,
  sms: initialSmsState,
  step: 1,
  validation: null
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FORWARD: {
      if (action.step < 0) {
        return {
          ...state,
          step: state.step < 6 ? state.step + 1 : state.step // state.stepが4(最大値)より小さければstepをインクリメント。4以上だったら変更なし
        }
      } else {
        return {
          ...state,
          step: action.step < 7 ? action.step : 6 // 渡ってきた数値が5より小さければ、その数値をそのままリターン。5以上だったら4(stepの最大値)を返す
        }
      }
    }
    case BACK: {
      return {
        ...state,
        step: state.step > 1 ? state.step - 1 : state.step
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
    case GET_CATEGORIES_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: action.payload.categories
      }
    }
    case GET_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_TAGS_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_TAGS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        tags: action.payload.tags
      }
    }
    case GET_TAGS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_TAG_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_TAG_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        tags: action.payload.tags
      }
    }
    case POST_TAG_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_ADDED_TAG_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_ADDED_TAG_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        added_tags: action.payload.added_tags
      }
    }
    case POST_ADDED_TAG_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case POST_SELECTED_TAG_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case POST_SELECTED_TAG_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selected_tags: action.payload.selected_tags
      }
    }
    case POST_SELECTED_TAG_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      }
    }
    case GET_SELECTED_TAG_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_SELECTED_TAG_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selected_tags: action.payload.selected_tags
      }
    }
    case GET_SELECTED_TAG_FAILURE: {
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
    case GET_STUDENT_REQUEST: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_STUDENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        otherUser: { ...{}, ...action.payload.otherUser }
      }
    }
    case GET_STUDENT_FAILURE: {
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
