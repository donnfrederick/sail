import axios from 'axios'
import * as ConversationModels from 'models/conversation'
import * as EvaluationsModels from 'models/evaluations'
import * as qs from 'qs'
import { Dispatch } from 'react-redux'
import resolvePath from 'utils/resolvePath'

// Action
const FORWARD = 'conversation/forward'
const BACK = 'conversation/back'
const CHANGE_YEAR = 'conversation/changeYear'
const CHANGE_MONTH = 'conversation/changeMonth'
const CHANGE_TIME_SELECT = 'conversation/changeTimeSelect'
const SELECT_DATE = 'conversation/selectDate'
const SELECT_START_TIME = 'conversation/selectStartTime'
const SELECT_END_TIME = 'conversation/selectEndTime'
const SET_RESERVATION_TYPE = 'conversation/setReservationType'
const SET_CONNECTING = 'conversation/setConnecting'
const CLEAR_CONNECTING = 'conversation/clearConnecting'
const UPDATE_REMAINING_TIME = 'conversation/updateRemainingTime'
const SET_SERVER_TIME = 'conversation/setServerTime'
const CHANGE_CONVERSATION_MODE = 'conversation/changeConversationMode'
const OPEN_TOPICS = 'conversation/openTopics'
const CLOSE_TOPICS = 'conversation/closeTopics'
const SET_TOPICS = 'conversation/setTopics'
const OPEN_CHATS = 'conversation/open'
const CLOSE_CHATS = 'conversation/close'
const SET_CHATS = 'conversation/setChats'
const SET_CURRENT_TOPIC = 'conversation/setCurrentTopic'
const SET_YOU_ARE_LATE = 'conversation/setYouAreLate'
const CLEAR_YOU_ARE_LATE = 'conversation/clearYouAreLate'
const SET_CLOSE_SOON = 'conversation/setCloseSoon'
const SET_BANDWIDTH = 'conversation/setBandwidth'
const RESET_RECOMMENDED_RESERVATIONS =
  'conversation/resetRecommendedReservations'
const SET_EVALUATION = 'conversation/setEvaluation'
const POST_CONVERSATIONS_REQUEST = 'conversation/postConversationsRequest'
const POST_CONVERSATIONS_SUCCESS = 'conversation/postConversationsSuccess'
const POST_CONVERSATIONS_FAILURE = 'conversation/postConversationsFailure'
const GET_CONVERSATIONS_REQUEST = 'conversation/getConversationsRequest'
const GET_CONVERSATIONS_SUCCESS = 'conversation/getConversationsSuccess'
const GET_CONVERSATIONS_FAILURE = 'conversation/getConversationsFailure'
const GET_CONVERSATIONS_ID_REQUEST = 'conversation/getConversationsIdRequest'
const GET_CONVERSATIONS_ID_SUCCESS = 'conversation/getConversationsIdSuccess'
const GET_CONVERSATIONS_ID_FAILURE = 'conversation/getConversationsIdFailure'
const GET_CANCELLED_CONVERSATIONS_ID_REQUEST =
  'conversation/getCancelledConversationsIdRequest'
const GET_CANCELLED_CONVERSATIONS_ID_SUCCESS =
  'conversation/getCancelledConversationsIdSuccess'
const GET_CANCELLED_CONVERSATIONS_ID_FAILURE =
  'conversation/getCancelledConversationsIdFailure'
const CLEAR_CONVERSATIONS_ID = 'conversation/clearConversationsId'
const CLEAR_CANCELLED_CONVERSATIONS_ID =
  'conversation/clearCancelledConversationsId'
const DELETE_CONVERSATIONS_REQUEST = 'conversation/deleteConversationsRequest'
const DELETE_CONVERSATIONS_SUCCESS = 'conversation/deleteConversationsSuccess'
const DELETE_CONVERSATIONS_FAILURE = 'conversation/deleteConversationsFailure'
const POST_CONVERSATIONS_EVALUATE_REQUEST =
  'conversation/postConversationsEvaluateRequest'
const POST_CONVERSATIONS_EVALUATE_SUCCESS =
  'conversation/postConversationsEvaluateSuccess'
const POST_CONVERSATIONS_EVALUATE_FAILURE =
  'conversation/postConversationsEvaluateFailure'
const PATCH_CONVERSATIONS_EVALUATE_REQUEST =
  'conversation/patchConversationsEvaluateRequest'
const PATCH_CONVERSATIONS_EVALUATE_SUCCESS =
  'conversation/patchConversationsEvaluateSuccess'
const PATCH_CONVERSATIONS_EVALUATE_FAILURE =
  'conversation/patchConversationsEvaluateFailure'
const POST_CONVERSATIONS_MEMO_REQUEST =
  'conversation/postConversationsMemoRequest'
const POST_CONVERSATIONS_MEMO_SUCCESS =
  'conversation/postConversationsMemoSuccess'
const POST_CONVERSATIONS_MEMO_FAILURE =
  'conversation/postConversationsMemoFailure'
const PATCH_CONVERSATIONS_MEMO_REQUEST =
  'conversation/patchConversationsMemoRequest'
const PATCH_CONVERSATIONS_MEMO_SUCCESS =
  'conversation/patchConversationsMemoSuccess'
const PATCH_CONVERSATIONS_MEMO_FAILURE =
  'conversation/patchConversationsMemoFailure'
const POST_CONVERSATIONS_REPORT_REQUEST =
  'conversation/postConversationsReportRequest'
const POST_CONVERSATIONS_REPORT_SUCCESS =
  'conversation/postConversationsReportSuccess'
const POST_CONVERSATIONS_REPORT_FAILURE =
  'conversation/postConversationsReportFailure'
const PATCH_CONVERSATIONS_REPORT_REQUEST =
  'conversation/patchConversationsReportRequest'
const PATCH_CONVERSATIONS_REPORT_SUCCESS =
  'conversation/patchConversationsReportSuccess'
const PATCH_CONVERSATIONS_REPORT_FAILURE =
  'conversation/patchConversationsReportFailure'
const GET_CALENDAR_REQUEST = 'conversation/getCalendarRequest'
const GET_CALENDAR_SUCCESS = 'conversation/getCalendarSuccess'
const GET_CALENDAR_FAILURE = 'conversation/getCalendarFailure'
const GET_RECOMMEND_REQUEST = 'conversation/getRecommendRequest'
const GET_RECOMMEND_SUCCESS = 'conversation/getRecommendSuccess'
const GET_RECOMMEND_FAILURE = 'conversation/getRecommendFailure'
const GET_RECOMMEND_ID_REQUEST = 'conversation/getRecommendIdRequest'
const GET_RECOMMEND_ID_SUCCESS = 'conversation/getRecommendIdSuccess'
const GET_RECOMMEND_ID_FAILURE = 'conversation/getRecommendIdFailure'
const POST_RESERVE_REQUEST = 'conversation/postReserveRequest'
const POST_RESERVE_SUCCESS = 'conversation/postReserveSuccess'
const POST_RESERVE_FAILURE = 'conversation/postReserveFailure'
const POST_REQUEST_CONVERSATIONS_REQUEST =
  'conversation/postRequestConversationsRequest'
const POST_REQUEST_CONVERSATIONS_SUCCESS =
  'conversation/postRequestConversationsSuccess'
const POST_REQUEST_CONVERSATIONS_FAILURE =
  'conversation/postRequestConversationsFailure'
const GET_STUDENTS_REQUEST_CONVERSATIONS_REQUEST =
  'conversation/getStudentsRequestConversationsRequest'
const GET_STUDENTS_REQUEST_CONVERSATIONS_SUCCESS =
  'conversation/getStudentsRequestConversationsSuccess'
const GET_STUDENTS_REQUEST_CONVERSATIONS_FAILURE =
  'conversation/getStudentsRequestConversationsFailure'
const DELETE_REQUEST_CONVERSATIONS_REQUEST =
  'conversation/deleteRequestConversationsRequest'
const DELETE_REQUEST_CONVERSATIONS_SUCCESS =
  'conversation/deleteRequestConversationsSuccess'
const DELETE_REQUEST_CONVERSATIONS_FAILURE =
  'conversation/deleteRequestConversationsFailure'

// 仮。実際はGET_STUDENTS_REQUEST_CONVERSATIONS_ID_REQUEST, SUCCESS, FAILUREのセットで管理するはず。
const GET_STUDENTS_REQUEST_CONVERSATIONS_ID =
  'conversation/getStudentsRequestConversationsId'
const CLEAR_STUDENTS_REQUEST_CONVERSATIONS_ID =
  'conversation/clearStudentsRequestConversationsId'

const GET_TEACHERS_REQUEST_CONVERSATIONS_REQUEST =
  'conversation/getTeachersRequestConversationsRequest'
const GET_TEACHERS_REQUEST_CONVERSATIONS_SUCCESS =
  'conversation/getTeachersRequestConversationsSuccess'
const GET_TEACHERS_REQUEST_CONVERSATIONS_FAILURE =
  'conversation/getTeachersRequestConversationsFailure'

// 仮。実際はGET_TEACHERS_REQUEST_CONVERSATIONS_ID_REQUEST, SUCCESS, FAILUREのセットで管理するはず。
const GET_TEACHERS_REQUEST_CONVERSATIONS_ID =
  'conversation/getTeachersRequestConversationsId'
const CLEAR_TEACHERS_REQUEST_CONVERSATIONS_ID =
  'conversation/clearTeachersRequestConversationsId'

const POST_APPROVE_REQUEST_CONVERSATIONS_REQUEST =
  'conversation/postApproveRequestConversationsRequest'
const POST_APPROVE_REQUEST_CONVERSATIONS_SUCCESS =
  'conversation/postApproveRequestConversationsSuccess'
const POST_APPROVE_REQUEST_CONVERSATIONS_FAILURE =
  'conversation/postApproveRequestConversationsFailure'

interface Forward {
  type: typeof FORWARD
}

interface Back {
  type: typeof BACK
}

interface ChangeYear {
  type: typeof CHANGE_YEAR
  payload: {
    year: number
  }
}

interface ChangeMonth {
  type: typeof CHANGE_MONTH
  payload: {
    month: number
  }
}

interface ChangeTimeSelect {
  type: typeof CHANGE_TIME_SELECT
  payload: {
    type: ConversationModels.TimeSelectType
  }
}

interface SelectDate {
  type: typeof SELECT_DATE
  payload: {
    date: string
  }
}

interface SelectStartTime {
  type: typeof SELECT_START_TIME
  payload: {
    time: string
  }
}

interface SelectEndTime {
  type: typeof SELECT_END_TIME
  payload: {
    time: string
  }
}

interface SetReservationType {
  type: typeof SET_RESERVATION_TYPE
  payload: {
    reservationType: ConversationModels.ReservationType
  }
}

interface SetConnecting {
  type: typeof SET_CONNECTING
}

interface ClearConnecting {
  type: typeof CLEAR_CONNECTING
}

interface UpdateRemainingTime {
  type: typeof UPDATE_REMAINING_TIME
  payload: {
    remainingTime: string
  }
}

interface SetServerTIme {
  type: typeof SET_SERVER_TIME
  payload: {
    serverTime: ConversationModels.ServerTime
  }
}

interface ChangeConversationMode {
  type: typeof CHANGE_CONVERSATION_MODE
  payload: {
    conversationMode: ConversationModels.ConversationMode
  }
}

interface OpenTopics {
  type: typeof OPEN_TOPICS
}

interface CloseTopics {
  type: typeof CLOSE_TOPICS
}

interface SetTopics {
  type: typeof SET_TOPICS
  payload: {
    topics: ConversationModels.Topics
  }
}

interface OpenChats {
  type: typeof OPEN_CHATS
}

interface CloseChats {
  type: typeof CLOSE_CHATS
}

interface SetChats {
  type: typeof SET_CHATS
  payload: {
    chats: ConversationModels.Chats[]
  }
}

interface SetCurrentTopic {
  type: typeof SET_CURRENT_TOPIC
  payload: {
    currentTopic: string
  }
}

interface SetYouAreLate {
  type: typeof SET_YOU_ARE_LATE
}

interface ClearYouAreLate {
  type: typeof CLEAR_YOU_ARE_LATE
}

interface SetCloseSoon {
  type: typeof SET_CLOSE_SOON
}

interface SetBandwidth {
  type: typeof SET_BANDWIDTH
  payload: {
    bandwidth: number
  }
}

interface ResetRecommendedReservations {
  type: typeof RESET_RECOMMENDED_RESERVATIONS
}

interface SetEvaluation {
  type: typeof SET_EVALUATION
  payload: {
    evaluate: EvaluationsModels.Questionnaire
  }
}

interface PostConversationsRequest {
  type: typeof POST_CONVERSATIONS_REQUEST
}

interface PostConversationsSuccess {
  type: typeof POST_CONVERSATIONS_SUCCESS
  payload: {
    response: ConversationModels.Response
  }
}

interface PostConversationsFailure {
  type: typeof POST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetConversationsRequest {
  type: typeof GET_CONVERSATIONS_REQUEST
}

interface GetConversationsSuccess {
  type: typeof GET_CONVERSATIONS_SUCCESS
  payload: {
    reservations: ConversationModels.ConversationResponse
  }
}

interface GetConversationsFailure {
  type: typeof GET_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetConversationsIdRequest {
  type: typeof GET_CONVERSATIONS_ID_REQUEST
}

interface GetConversationsIdSuccess {
  type: typeof GET_CONVERSATIONS_ID_SUCCESS
  payload: {
    conversation: ConversationModels.Conversation
  }
}

interface GetConversationsIdFailure {
  type: typeof GET_CONVERSATIONS_ID_FAILURE
  payload: {
    error: any
  }
}

interface GetCancelledConversationsIdRequest {
  type: typeof GET_CANCELLED_CONVERSATIONS_ID_REQUEST
}

interface GetCancelledConversationsIdSuccess {
  type: typeof GET_CANCELLED_CONVERSATIONS_ID_SUCCESS
  payload: {
    cancelledConversation: ConversationModels.CancelledConversation
  }
}

interface GetCancelledConversationsIdFailure {
  type: typeof GET_CANCELLED_CONVERSATIONS_ID_FAILURE
  payload: {
    error: any
  }
}

interface ClearConversationsId {
  type: typeof CLEAR_CONVERSATIONS_ID
}

interface ClearCancelledConversationsId {
  type: typeof CLEAR_CANCELLED_CONVERSATIONS_ID
}

interface DeleteConversationsRequest {
  type: typeof DELETE_CONVERSATIONS_REQUEST
}

interface DeleteConversationsSuccess {
  type: typeof DELETE_CONVERSATIONS_SUCCESS
  payload: {
    deletedConversation: ConversationModels.Conversation
  }
}

interface DeleteConversationsFailure {
  type: typeof DELETE_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface PostConversationsEvaluateRequest {
  type: typeof POST_CONVERSATIONS_EVALUATE_REQUEST
}

interface PostConversationsEvaluateSuccess {
  type: typeof POST_CONVERSATIONS_EVALUATE_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PostConversationsEvaluateFailure {
  type: typeof POST_CONVERSATIONS_EVALUATE_FAILURE
  payload: {
    error: any
  }
}

interface PatchConversationsEvaluateRequest {
  type: typeof PATCH_CONVERSATIONS_EVALUATE_REQUEST
}

interface PatchConversationsEvaluateSuccess {
  type: typeof PATCH_CONVERSATIONS_EVALUATE_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PatchConversationsEvaluateFailure {
  type: typeof PATCH_CONVERSATIONS_EVALUATE_FAILURE
  payload: {
    error: any
  }
}

interface PostConversationsMemoRequest {
  type: typeof POST_CONVERSATIONS_MEMO_REQUEST
}

interface PostConversationsMemoSuccess {
  type: typeof POST_CONVERSATIONS_MEMO_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PostConversationsMemoFailure {
  type: typeof POST_CONVERSATIONS_MEMO_FAILURE
  payload: {
    error: any
  }
}

interface PatchConversationsMemoRequest {
  type: typeof PATCH_CONVERSATIONS_MEMO_REQUEST
}

interface PatchConversationsMemoSuccess {
  type: typeof PATCH_CONVERSATIONS_MEMO_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PatchConversationsMemoFailure {
  type: typeof PATCH_CONVERSATIONS_MEMO_FAILURE
  payload: {
    error: any
  }
}

interface PostConversationsReportRequest {
  type: typeof POST_CONVERSATIONS_REPORT_REQUEST
}

interface PostConversationsReportSuccess {
  type: typeof POST_CONVERSATIONS_REPORT_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PostConversationsReportFailure {
  type: typeof POST_CONVERSATIONS_REPORT_FAILURE
  payload: {
    error: any
  }
}

interface PatchConversationsReportRequest {
  type: typeof PATCH_CONVERSATIONS_REPORT_REQUEST
}

interface PatchConversationsReportSuccess {
  type: typeof PATCH_CONVERSATIONS_REPORT_SUCCESS
  payload: {
    evaluatedConversation: ConversationModels.Conversation
  }
}

interface PatchConversationsReportFailure {
  type: typeof PATCH_CONVERSATIONS_REPORT_FAILURE
  payload: {
    error: any
  }
}

interface GetCalendarRequest {
  type: typeof GET_CALENDAR_REQUEST
}

interface GetCalendarSuccess {
  type: typeof GET_CALENDAR_SUCCESS
  payload: {
    calendar: ConversationModels.Calendar
  }
}

interface GetCalendarFailure {
  type: typeof GET_CALENDAR_FAILURE
  payload: {
    error: any
  }
}

interface GetRecommendRequest {
  type: typeof GET_RECOMMEND_REQUEST
}

interface GetRecommendSuccess {
  type: typeof GET_RECOMMEND_SUCCESS
  payload: {
    recommendedReservations: ConversationModels.Conversation[]
  }
}

interface GetRecommendFailure {
  type: typeof GET_RECOMMEND_FAILURE
  payload: {
    error: any
  }
}

interface GetRecommendIdRequest {
  type: typeof GET_RECOMMEND_ID_REQUEST
}

interface GetRecommendIdSuccess {
  type: typeof GET_RECOMMEND_ID_SUCCESS
  payload: {
    recommendedReservation: ConversationModels.Conversation
  }
}

interface GetRecommendIdFailure {
  type: typeof GET_RECOMMEND_ID_FAILURE
  payload: {
    error: any
  }
}

interface PostReserveRequest {
  type: typeof POST_RESERVE_REQUEST
}

interface PostReserveSuccess {
  type: typeof POST_RESERVE_SUCCESS
  payload: {
    reservedConversation: ConversationModels.Conversation
  }
}

interface PostReserveFailure {
  type: typeof POST_RESERVE_FAILURE
  payload: {
    error: any
  }
}

interface PostRequestConversationsRequest {
  type: typeof POST_REQUEST_CONVERSATIONS_REQUEST
}

interface PostRequestConversationsSuccess {
  type: typeof POST_REQUEST_CONVERSATIONS_SUCCESS
  payload: {
    reservedConversation: ConversationModels.Conversation
  }
}

interface PostRequestConversationsFailure {
  type: typeof POST_REQUEST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetStudentsRequestConversationsRequest {
  type: typeof GET_STUDENTS_REQUEST_CONVERSATIONS_REQUEST
}

interface GetStudentsRequestConversationsSuccess {
  type: typeof GET_STUDENTS_REQUEST_CONVERSATIONS_SUCCESS
  payload: {
    studentsRequestConversations: ConversationModels.RequestConversationResponse
  }
}

interface GetStudentsRequestConversationsFailure {
  type: typeof GET_STUDENTS_REQUEST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface DeleteRequestConversationsRequest {
  type: typeof DELETE_REQUEST_CONVERSATIONS_REQUEST
}

interface DeleteRequestConversationsSuccess {
  type: typeof DELETE_REQUEST_CONVERSATIONS_SUCCESS
  payload: {
    deletedRequestConversation: ConversationModels.RequestConversation
  }
}

interface DeleteRequestConversationsFailure {
  type: typeof DELETE_REQUEST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetStudentsRequestConversationsId {
  type: typeof GET_STUDENTS_REQUEST_CONVERSATIONS_ID
  payload: {
    studentsRequestConversation: ConversationModels.RequestConversation
  }
}

interface ClearStudentsRequestConversationsId {
  type: typeof CLEAR_STUDENTS_REQUEST_CONVERSATIONS_ID
}

interface GetTeachersRequestConversationsRequest {
  type: typeof GET_TEACHERS_REQUEST_CONVERSATIONS_REQUEST
}

interface GetTeachersRequestConversationsSuccess {
  type: typeof GET_TEACHERS_REQUEST_CONVERSATIONS_SUCCESS
  payload: {
    teachersRequestConversations: ConversationModels.Conversation[]
  }
}

interface GetTeachersRequestConversationsFailure {
  type: typeof GET_TEACHERS_REQUEST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

interface GetTeachersRequestConversationsId {
  type: typeof GET_TEACHERS_REQUEST_CONVERSATIONS_ID
  payload: {
    teachersRequestConversation: ConversationModels.RequestConversationInConversation
  }
}

interface ClearTeachersRequestConversationsId {
  type: typeof CLEAR_TEACHERS_REQUEST_CONVERSATIONS_ID
}

interface PostApproveRequestConversationsRequest {
  type: typeof POST_APPROVE_REQUEST_CONVERSATIONS_REQUEST
}

interface PostApproveRequestConversationsSuccess {
  type: typeof POST_APPROVE_REQUEST_CONVERSATIONS_SUCCESS
  payload: {
    teachersRequestConversation: ConversationModels.RequestConversationInConversation
  }
}

interface PostApproveRequestConversationsFailure {
  type: typeof POST_APPROVE_REQUEST_CONVERSATIONS_FAILURE
  payload: {
    error: any
  }
}

type Action =
  | Forward
  | Back
  | ChangeYear
  | ChangeMonth
  | ChangeTimeSelect
  | SelectDate
  | SelectStartTime
  | SelectEndTime
  | SetReservationType
  | SetConnecting
  | ClearConnecting
  | UpdateRemainingTime
  | SetServerTIme
  | ChangeConversationMode
  | OpenTopics
  | CloseTopics
  | SetTopics
  | OpenChats
  | CloseChats
  | SetChats
  | SetCurrentTopic
  | SetYouAreLate
  | ClearYouAreLate
  | SetCloseSoon
  | SetBandwidth
  | ResetRecommendedReservations
  | SetEvaluation
  | PostConversationsRequest
  | PostConversationsSuccess
  | PostConversationsFailure
  | GetConversationsRequest
  | GetConversationsSuccess
  | GetConversationsFailure
  | GetConversationsIdRequest
  | GetConversationsIdSuccess
  | GetConversationsIdFailure
  | GetCancelledConversationsIdRequest
  | GetCancelledConversationsIdSuccess
  | GetCancelledConversationsIdFailure
  | ClearConversationsId
  | ClearCancelledConversationsId
  | DeleteConversationsRequest
  | DeleteConversationsSuccess
  | DeleteConversationsFailure
  | PostConversationsEvaluateRequest
  | PostConversationsEvaluateSuccess
  | PostConversationsEvaluateFailure
  | PatchConversationsEvaluateRequest
  | PatchConversationsEvaluateSuccess
  | PatchConversationsEvaluateFailure
  | PostConversationsMemoRequest
  | PostConversationsMemoSuccess
  | PostConversationsMemoFailure
  | PatchConversationsMemoRequest
  | PatchConversationsMemoSuccess
  | PatchConversationsMemoFailure
  | PostConversationsReportRequest
  | PostConversationsReportSuccess
  | PostConversationsReportFailure
  | PatchConversationsReportRequest
  | PatchConversationsReportSuccess
  | PatchConversationsReportFailure
  | GetCalendarRequest
  | GetCalendarSuccess
  | GetCalendarFailure
  | GetRecommendRequest
  | GetRecommendSuccess
  | GetRecommendFailure
  | GetRecommendIdRequest
  | GetRecommendIdSuccess
  | GetRecommendIdFailure
  | PostReserveRequest
  | PostReserveSuccess
  | PostReserveFailure
  | PostRequestConversationsRequest
  | PostRequestConversationsSuccess
  | PostRequestConversationsFailure
  | GetStudentsRequestConversationsRequest
  | GetStudentsRequestConversationsSuccess
  | GetStudentsRequestConversationsFailure
  | DeleteRequestConversationsRequest
  | DeleteRequestConversationsSuccess
  | DeleteRequestConversationsFailure
  | GetStudentsRequestConversationsId
  | ClearStudentsRequestConversationsId
  | GetTeachersRequestConversationsRequest
  | GetTeachersRequestConversationsSuccess
  | GetTeachersRequestConversationsFailure
  | GetTeachersRequestConversationsId
  | ClearTeachersRequestConversationsId
  | PostApproveRequestConversationsRequest
  | PostApproveRequestConversationsSuccess
  | PostApproveRequestConversationsFailure

export const forward = (): Forward => {
  return {
    type: FORWARD
  }
}

export const back = (): Back => {
  return {
    type: BACK
  }
}

export const changeYear = (year: number): ChangeYear => {
  return {
    payload: {
      year
    },
    type: CHANGE_YEAR
  }
}

export const changeMonth = (month: number): ChangeMonth => {
  return {
    payload: {
      month
    },
    type: CHANGE_MONTH
  }
}

export const changeTimeSelect = (
  type: ConversationModels.TimeSelectType
): ChangeTimeSelect => {
  return {
    payload: {
      type
    },
    type: CHANGE_TIME_SELECT
  }
}

export const selectDate = (date: string): SelectDate => {
  return {
    payload: {
      date
    },
    type: SELECT_DATE
  }
}

export const selectStartTime = (time: string): SelectStartTime => {
  return {
    payload: {
      time
    },
    type: SELECT_START_TIME
  }
}

export const selectEndTime = (time: string): SelectEndTime => {
  return {
    payload: {
      time
    },
    type: SELECT_END_TIME
  }
}

export const setReservationType = (
  reservationType: ConversationModels.ReservationType
): SetReservationType => {
  return {
    payload: {
      reservationType
    },
    type: SET_RESERVATION_TYPE
  }
}

export const setConnecting = (): SetConnecting => {
  return {
    type: SET_CONNECTING
  }
}

export const clearConnecting = (): ClearConnecting => {
  return {
    type: CLEAR_CONNECTING
  }
}

export const updateRemainingTime = (
  remainingTime: string
): UpdateRemainingTime => {
  return {
    payload: {
      remainingTime
    },
    type: UPDATE_REMAINING_TIME
  }
}

export const setServerTime = (
  serverTime: ConversationModels.ServerTime
): SetServerTIme => {
  return {
    payload: {
      serverTime
    },
    type: SET_SERVER_TIME
  }
}

export const changeConversationMode = (
  conversationMode: ConversationModels.ConversationMode
): ChangeConversationMode => {
  return {
    payload: {
      conversationMode
    },
    type: CHANGE_CONVERSATION_MODE
  }
}

export const openTopics = (): OpenTopics => {
  return {
    type: OPEN_TOPICS
  }
}

export const closeTopics = (): CloseTopics => {
  return {
    type: CLOSE_TOPICS
  }
}

export const setTopics = (topics: ConversationModels.Topics): SetTopics => {
  return {
    payload: {
      topics
    },
    type: SET_TOPICS
  }
}

export const openChats = (): OpenChats => {
  return {
    type: OPEN_CHATS
  }
}

export const closeChats = (): CloseChats => {
  return {
    type: CLOSE_CHATS
  }
}

export const setChats = (chats: ConversationModels.Chats[]): SetChats => {
  return {
    payload: {
      chats
    },
    type: SET_CHATS
  }
}

export const setCurrentTopic = (currentTopic: string): SetCurrentTopic => {
  return {
    payload: {
      currentTopic
    },
    type: SET_CURRENT_TOPIC
  }
}

export const setYouAreLate = (): SetYouAreLate => {
  return {
    type: SET_YOU_ARE_LATE
  }
}

export const clearYouAreLate = (): ClearYouAreLate => {
  return {
    type: CLEAR_YOU_ARE_LATE
  }
}

export const setCloseSoon = (): SetCloseSoon => {
  return {
    type: SET_CLOSE_SOON
  }
}

export const setBandwidth = (bandwidth: number): SetBandwidth => {
  return {
    payload: {
      bandwidth
    },
    type: SET_BANDWIDTH
  }
}

export const resetRecommendedReservations = (): ResetRecommendedReservations => {
  return {
    type: RESET_RECOMMENDED_RESERVATIONS
  }
}

export const setEvaluation = (
  evaluate: EvaluationsModels.Questionnaire
): SetEvaluation => {
  return {
    payload: {
      evaluate
    },
    type: SET_EVALUATION
  }
}

export const postConversationsRequest = (): PostConversationsRequest => {
  return {
    type: POST_CONVERSATIONS_REQUEST
  }
}

export const postConversationsSuccess = (
  response: ConversationModels.Response
): PostConversationsSuccess => {
  return {
    payload: {
      response
    },
    type: POST_CONVERSATIONS_SUCCESS
  }
}

export const postConversationsFailure = (
  error: any
): PostConversationsFailure => {
  return {
    payload: {
      error
    },
    type: POST_CONVERSATIONS_FAILURE
  }
}

export const postConversations = (
  authToken: string,
  request: ConversationModels.Request
) => (dispatch: Dispatch) => {
  dispatch(postConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .post(resolvePath.api('conversations'), request, config)
    .then(response => dispatch(postConversationsSuccess(response.data)))
    .catch(error => {
      dispatch(postConversationsFailure(error))
      throw error
    })
}

export const getConversationsRequest = (): GetConversationsRequest => {
  return {
    type: GET_CONVERSATIONS_REQUEST
  }
}

export const getConversationsSuccess = (
  response: ConversationModels.ConversationResponse
): GetConversationsSuccess => {
  return {
    payload: {
      reservations: response
    },
    type: GET_CONVERSATIONS_SUCCESS
  }
}

export const getConversationsFailure = (
  error: any
): GetConversationsFailure => {
  return {
    payload: {
      error
    },
    type: GET_CONVERSATIONS_FAILURE
  }
}

export const getConversations = (
  authToken: string,
  parameters: ConversationModels.ConversationRequest
) => {
  return (dispatch: Dispatch) => {
    dispatch(getConversationsRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(
        `${resolvePath.api('conversations')}?${qs.stringify(parameters)}`,
        config
      )
      .then(response => dispatch(getConversationsSuccess(response.data)))
      .catch(error => {
        dispatch(getConversationsFailure(error))
        throw error
      })
  }
}

export const getConversationsIdRequest = (): GetConversationsIdRequest => {
  return {
    type: GET_CONVERSATIONS_ID_REQUEST
  }
}

export const getConversationsIdSuccess = (
  response: ConversationModels.Conversation
): GetConversationsIdSuccess => {
  return {
    payload: {
      conversation: response
    },
    type: GET_CONVERSATIONS_ID_SUCCESS
  }
}

export const getConversationsIdFailure = (
  error: any
): GetConversationsIdFailure => {
  return {
    payload: {
      error
    },
    type: GET_CONVERSATIONS_ID_FAILURE
  }
}

export const getCancelledConversationsIdRequest = (): GetCancelledConversationsIdRequest => {
  return {
    type: GET_CANCELLED_CONVERSATIONS_ID_REQUEST
  }
}

export const getCancelledConversationsIdSuccess = (
  response: ConversationModels.CancelledConversation
): GetCancelledConversationsIdSuccess => {
  return {
    payload: {
      cancelledConversation: response
    },
    type: GET_CANCELLED_CONVERSATIONS_ID_SUCCESS
  }
}

export const getCancelledConversationsIdFailure = (
  error: any
): GetCancelledConversationsIdFailure => {
  return {
    payload: {
      error
    },
    type: GET_CANCELLED_CONVERSATIONS_ID_FAILURE
  }
}

export const getConversationsId = (authToken: string, id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getConversationsIdRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(`${resolvePath.api(`conversations/${id}`)}`, config)
      .then(response => dispatch(getConversationsIdSuccess(response.data)))
      .catch(error => {
        dispatch(getConversationsIdFailure(error))
        throw error
      })
  }
}

export const clearConversationsId = (): ClearConversationsId => {
  return {
    type: CLEAR_CONVERSATIONS_ID
  }
}

export const clearCancelledConversationsId = (): ClearCancelledConversationsId => {
  return {
    type: CLEAR_CANCELLED_CONVERSATIONS_ID
  }
}

export const deleteConversationsRequest = (): DeleteConversationsRequest => {
  return {
    type: DELETE_CONVERSATIONS_REQUEST
  }
}

export const deleteConversationsSuccess = (
  deletedConversation: ConversationModels.Conversation
): DeleteConversationsSuccess => {
  return {
    payload: {
      deletedConversation
    },
    type: DELETE_CONVERSATIONS_SUCCESS
  }
}

export const deleteConversationsFailure = (
  error: any
): DeleteConversationsFailure => {
  return {
    payload: {
      error
    },
    type: DELETE_CONVERSATIONS_FAILURE
  }
}

export const deleteConversations = (authToken: string, id: number) => (
  dispatch: Dispatch
) => {
  dispatch(deleteConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .delete(resolvePath.api(`conversations/${id}`), config)
    .then(response => dispatch(deleteConversationsSuccess(response.data)))
    .catch(error => {
      dispatch(deleteConversationsFailure(error))
      throw error
    })
}

export const postConversationsEvaluateRequest = (): PostConversationsEvaluateRequest => {
  return {
    type: POST_CONVERSATIONS_EVALUATE_REQUEST
  }
}

export const postConversationsEvaluateSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PostConversationsEvaluateSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: POST_CONVERSATIONS_EVALUATE_SUCCESS
  }
}

export const postConversationsEvaluateFailure = (
  error: any
): PostConversationsEvaluateFailure => {
  return {
    payload: {
      error
    },
    type: POST_CONVERSATIONS_EVALUATE_FAILURE
  }
}

export const postConversationsEvaluate = (
  authToken: string,
  id: number,
  evaluate: EvaluationsModels.Questionnaire
) => (dispatch: Dispatch) => {
  dispatch(postConversationsEvaluateRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    ...evaluate
  }

  return axios
    .post(resolvePath.api(`conversations/${id}/evaluate2`), request, config)
    .then(response => {
      dispatch(postConversationsEvaluateSuccess(response.data))
    })
    .catch(error => {
      dispatch(postConversationsEvaluateFailure(error))
      throw error
    })
}

export const patchConversationsEvaluateRequest = (): PatchConversationsEvaluateRequest => {
  return {
    type: PATCH_CONVERSATIONS_EVALUATE_REQUEST
  }
}

export const patchConversationsEvaluateSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PatchConversationsEvaluateSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: PATCH_CONVERSATIONS_EVALUATE_SUCCESS
  }
}

export const patchConversationsEvaluateFailure = (
  error: any
): PatchConversationsEvaluateFailure => {
  return {
    payload: {
      error
    },
    type: PATCH_CONVERSATIONS_EVALUATE_FAILURE
  }
}

export const patchConversationsEvaluate = (
  authToken: string,
  id: number,
  evaluate: EvaluationsModels.Questionnaire
) => (dispatch: Dispatch) => {
  dispatch(patchConversationsEvaluateRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    ...evaluate
  }

  return axios
    .patch(resolvePath.api(`conversations/${id}/evaluate2`), request, config)
    .then(response => {
      dispatch(patchConversationsEvaluateSuccess(response.data))
    })
    .catch(error => {
      dispatch(patchConversationsEvaluateFailure(error))
      throw error
    })
}

export const postConversationsMemoRequest = (): PostConversationsMemoRequest => {
  return {
    type: POST_CONVERSATIONS_MEMO_REQUEST
  }
}

export const postConversationsMemoSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PostConversationsMemoSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: POST_CONVERSATIONS_MEMO_SUCCESS
  }
}

export const postConversationsMemoFailure = (
  error: any
): PostConversationsMemoFailure => {
  return {
    payload: {
      error
    },
    type: POST_CONVERSATIONS_MEMO_FAILURE
  }
}

export const postConversationsMemo = (
  authToken: string,
  id: number,
  memo: string
) => (dispatch: Dispatch) => {
  dispatch(postConversationsMemoRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    memo
  }

  return axios
    .post(resolvePath.api(`conversations/${id}/memo`), request, config)
    .then(response => {
      dispatch(postConversationsMemoSuccess(response.data))
    })
    .catch(error => {
      dispatch(postConversationsMemoFailure(error))
      throw error
    })
}

export const patchConversationsMemoRequest = (): PatchConversationsMemoRequest => {
  return {
    type: PATCH_CONVERSATIONS_MEMO_REQUEST
  }
}

export const patchConversationsMemoSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PatchConversationsMemoSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: PATCH_CONVERSATIONS_MEMO_SUCCESS
  }
}

export const patchConversationsMemoFailure = (
  error: any
): PatchConversationsMemoFailure => {
  return {
    payload: {
      error
    },
    type: PATCH_CONVERSATIONS_MEMO_FAILURE
  }
}

export const patchConversationsMemo = (
  authToken: string,
  id: number,
  memo: string
) => (dispatch: Dispatch) => {
  dispatch(patchConversationsMemoRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    memo
  }

  return axios
    .patch(resolvePath.api(`conversations/${id}/memo`), request, config)
    .then(response => {
      dispatch(patchConversationsMemoSuccess(response.data))
    })
    .catch(error => {
      dispatch(patchConversationsMemoFailure(error))
      throw error
    })
}

export const postConversationsReportRequest = (): PostConversationsReportRequest => {
  return {
    type: POST_CONVERSATIONS_REPORT_REQUEST
  }
}

export const postConversationsReportSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PostConversationsReportSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: POST_CONVERSATIONS_REPORT_SUCCESS
  }
}

export const postConversationsReportFailure = (
  error: any
): PostConversationsReportFailure => {
  return {
    payload: {
      error
    },
    type: POST_CONVERSATIONS_REPORT_FAILURE
  }
}

export const postConversationsReport = (
  authToken: string,
  id: number,
  reportContent: ConversationModels.ReportContentRequest
) => (dispatch: Dispatch) => {
  dispatch(postConversationsReportRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    report_detail: reportContent.report_detail,
    report_reasons: reportContent.report_reasons
  }

  return axios
    .post(resolvePath.api(`conversations/${id}/report`), request, config)
    .then(response => {
      dispatch(postConversationsReportSuccess(response.data))
    })
    .catch(error => {
      dispatch(postConversationsReportFailure(error))
      throw error
    })
}

export const patchConversationsReportRequest = (): PatchConversationsReportRequest => {
  return {
    type: PATCH_CONVERSATIONS_REPORT_REQUEST
  }
}

export const patchConversationsReportSuccess = (
  evaluatedConversation: ConversationModels.Conversation
): PatchConversationsReportSuccess => {
  return {
    payload: {
      evaluatedConversation
    },
    type: PATCH_CONVERSATIONS_REPORT_SUCCESS
  }
}

export const patchConversationsReportFailure = (
  error: any
): PatchConversationsReportFailure => {
  return {
    payload: {
      error
    },
    type: PATCH_CONVERSATIONS_REPORT_FAILURE
  }
}

export const patchConversationsReport = (
  authToken: string,
  id: number,
  reportContent: ConversationModels.ReportContentRequest
) => (dispatch: Dispatch) => {
  dispatch(patchConversationsReportRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    report_detail: reportContent.report_detail,
    report_reasons: reportContent.report_reasons
  }

  return axios
    .patch(resolvePath.api(`conversations/${id}/report`), request, config)
    .then(response => {
      dispatch(patchConversationsReportSuccess(response.data))
    })
    .catch(error => {
      dispatch(patchConversationsReportFailure(error))
      throw error
    })
}

export const getCalendarRequest = (): GetCalendarRequest => {
  return {
    type: GET_CALENDAR_REQUEST
  }
}

export const getCalendarSuccess = (
  calendar: ConversationModels.Calendar
): GetCalendarSuccess => {
  return {
    payload: {
      calendar
    },
    type: GET_CALENDAR_SUCCESS
  }
}

export const getCalendarFailure = (error: any): GetCalendarFailure => {
  return {
    payload: {
      error
    },
    type: GET_CALENDAR_FAILURE
  }
}

export const getCalendar = (authToken: string, year: number, month: number) => (
  dispatch: Dispatch
) => {
  dispatch(getCalendarRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    month,
    year
  }
  return axios
    .get(
      `${resolvePath.api('conversations/calendar')}?${qs.stringify(request)}`,
      config
    )
    .then(response => dispatch(getCalendarSuccess(response.data)))
    .catch(error => {
      dispatch(getCalendarFailure(error))
      throw error
    })
}

export const getRecommendRequest = (): GetRecommendRequest => {
  return {
    type: GET_RECOMMEND_REQUEST
  }
}

export const getRecommendSuccess = (
  recommendedReservations: ConversationModels.Conversation[]
): GetRecommendSuccess => {
  return {
    payload: {
      recommendedReservations
    },
    type: GET_RECOMMEND_SUCCESS
  }
}

export const getRecommendFailure = (error: any): GetRecommendFailure => {
  return {
    payload: {
      error
    },
    type: GET_RECOMMEND_FAILURE
  }
}

export const getRecommend = (authToken: string, date: string) => (
  dispatch: Dispatch
) => {
  dispatch(getRecommendRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    date_on: date
  }
  return axios
    .get(
      `${resolvePath.api('conversations/recommend')}?${qs.stringify(request)}`,
      config
    )
    .then(response => dispatch(getRecommendSuccess(response.data)))
    .catch(error => {
      dispatch(getRecommendFailure(error))
      throw error
    })
}

export const getRecommendNew = (
  authToken: string,
  date: string,
  syspcurrentppage: number
) => (dispatch: Dispatch) => {
  dispatch(getRecommendRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    date_on: date,
    syspcurrentpage: syspcurrentppage
  }
  return axios
    .get(
      `${resolvePath.api('conversations/recommend')}?${qs.stringify(request)}`,
      config
    )
    .then(response => dispatch(getRecommendSuccess(response.data)))
    .catch(error => {
      dispatch(getRecommendFailure(error))
      throw error
    })
}

export const getRecommendIdRequest = (): GetRecommendIdRequest => {
  return {
    type: GET_RECOMMEND_ID_REQUEST
  }
}

export const getRecommendIdSuccess = (
  recommendedReservation: ConversationModels.Conversation
): GetRecommendIdSuccess => {
  return {
    payload: {
      recommendedReservation
    },
    type: GET_RECOMMEND_ID_SUCCESS
  }
}

export const getRecommendIdFailure = (error: any): GetRecommendIdFailure => {
  return {
    payload: {
      error
    },
    type: GET_RECOMMEND_ID_FAILURE
  }
}

export const getRecommendId = (authToken: string, id: number) => (
  dispatch: Dispatch
) => {
  dispatch(getRecommendIdRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(resolvePath.api(`conversations/recommend/${id}`), config)
    .then(response => dispatch(getRecommendIdSuccess(response.data)))
    .catch(error => {
      dispatch(getRecommendIdFailure(error))
      throw error
    })
}

export const postReserveRequest = (): PostReserveRequest => {
  return {
    type: POST_RESERVE_REQUEST
  }
}

export const postReserveSuccess = (
  reservedConversation: ConversationModels.Conversation
): PostReserveSuccess => {
  return {
    payload: {
      reservedConversation
    },
    type: POST_RESERVE_SUCCESS
  }
}

export const postReserveFailure = (error: any): PostReserveFailure => {
  return {
    payload: {
      error
    },
    type: POST_RESERVE_FAILURE
  }
}

export const postReserve = (authToken: string, conversationId: number) => (
  dispatch: Dispatch
) => {
  dispatch(postReserveRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request = {
    id: conversationId
  }
  return axios
    .post(resolvePath.api('conversations/reserve'), request, config)
    .then(response => {
      dispatch(postReserveSuccess(response.data))
      dispatch(resetRecommendedReservations())
    })
    .catch(error => {
      dispatch(postReserveFailure(error))
      throw error
    })
}

export const getCancelledConversationsId = (authToken: string, id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(getConversationsIdRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    return axios
      .get(`${resolvePath.api(`conversations/cancelled/${id}`)}`, config)
      .then(response =>
        dispatch(getCancelledConversationsIdSuccess(response.data))
      )
      .catch(error => {
        dispatch(getConversationsIdFailure(error))
        throw error
      })
  }
}

export const postRequestConversationsRequest = (): PostRequestConversationsRequest => {
  return {
    type: POST_REQUEST_CONVERSATIONS_REQUEST
  }
}

export const postRequestConversationsSuccess = (
  reservedConversation: ConversationModels.Conversation
): PostRequestConversationsSuccess => {
  return {
    payload: {
      reservedConversation
    },
    type: POST_REQUEST_CONVERSATIONS_SUCCESS
  }
}

export const postRequestConversationsFailure = (
  error: any
): PostRequestConversationsFailure => {
  return {
    payload: {
      error
    },
    type: POST_REQUEST_CONVERSATIONS_FAILURE
  }
}

export const postRequestConversations = (
  authToken: string,
  conversationId: number,
  startAt: string
) => (dispatch: Dispatch) => {
  dispatch(postRequestConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  const request: ConversationModels.ConversationRequestPostParams = {
    reservable_conversation_id: conversationId,
    start_at: startAt
  }
  return axios
    .post(resolvePath.api(`conversation_requests`), request, config)
    .then(response => {
      dispatch(postRequestConversationsSuccess(response.data.conversation))
      dispatch(resetRecommendedReservations())
    })
    .catch(error => {
      dispatch(postRequestConversationsFailure(error))
      throw error
    })
}

export const getStudentsRequestConversationsRequest = (): GetStudentsRequestConversationsRequest => {
  return {
    type: GET_STUDENTS_REQUEST_CONVERSATIONS_REQUEST
  }
}

export const getStudentsRequestConversationsSuccess = (
  studentsRequestConversations: ConversationModels.RequestConversationResponse
): GetStudentsRequestConversationsSuccess => {
  return {
    payload: {
      studentsRequestConversations
    },
    type: GET_STUDENTS_REQUEST_CONVERSATIONS_SUCCESS
  }
}

export const getStudentsRequestConversationsFailure = (
  error: any
): GetStudentsRequestConversationsFailure => {
  return {
    payload: {
      error
    },
    type: GET_STUDENTS_REQUEST_CONVERSATIONS_FAILURE
  }
}

export const getStudentsRequestConversations = (authToken: string) => (
  dispatch: Dispatch
) => {
  dispatch(getStudentsRequestConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(resolvePath.api('conversation_requests'), config)
    .then(response =>
      dispatch(getStudentsRequestConversationsSuccess(response.data))
    )
    .catch(error => {
      dispatch(getStudentsRequestConversationsFailure(error))
      throw error
    })
}

export const deleteRequestConversationsRequest = (): DeleteRequestConversationsRequest => {
  return {
    type: DELETE_REQUEST_CONVERSATIONS_REQUEST
  }
}

export const deleteRequestConversationsSuccess = (
  deletedRequestConversation: ConversationModels.RequestConversation
): DeleteRequestConversationsSuccess => {
  return {
    payload: {
      deletedRequestConversation
    },
    type: DELETE_REQUEST_CONVERSATIONS_SUCCESS
  }
}

export const deleteRequestConversationsFailure = (
  error: any
): DeleteRequestConversationsFailure => {
  return {
    payload: {
      error
    },
    type: DELETE_REQUEST_CONVERSATIONS_FAILURE
  }
}

export const deleteRequestConversations = (authToken: string, id: number) => (
  dispatch: Dispatch
) => {
  dispatch(deleteRequestConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .delete(resolvePath.api(`conversation_requests/${id}`), config)
    .then(response =>
      dispatch(deleteRequestConversationsSuccess(response.data))
    )
    .catch(error => {
      dispatch(deleteRequestConversationsFailure(error))
      throw error
    })
}

export const getStudentsRequestConversationsId = (
  studentsRequestConversation: ConversationModels.RequestConversation
): GetStudentsRequestConversationsId => {
  return {
    payload: {
      studentsRequestConversation
    },
    type: GET_STUDENTS_REQUEST_CONVERSATIONS_ID
  }
}

export const clearStudentsRequestConversationsId = (): ClearStudentsRequestConversationsId => {
  return {
    type: CLEAR_STUDENTS_REQUEST_CONVERSATIONS_ID
  }
}

export const getTeachersRequestConversationsRequest = (): GetTeachersRequestConversationsRequest => {
  return {
    type: GET_TEACHERS_REQUEST_CONVERSATIONS_REQUEST
  }
}

export const getTeachersRequestConversationsSuccess = (
  teachersRequestConversations: ConversationModels.Conversation[]
): GetTeachersRequestConversationsSuccess => {
  return {
    payload: {
      teachersRequestConversations
    },
    type: GET_TEACHERS_REQUEST_CONVERSATIONS_SUCCESS
  }
}

export const getTeachersRequestConversationsFailure = (
  error: any
): GetTeachersRequestConversationsFailure => {
  return {
    payload: {
      error
    },
    type: GET_TEACHERS_REQUEST_CONVERSATIONS_FAILURE
  }
}

export const getTeachersRequestConversations = (authToken: string) => (
  dispatch: Dispatch
) => {
  dispatch(getTeachersRequestConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .get(resolvePath.api('conversations/requests_from_students'), config)
    .then(response =>
      dispatch(getTeachersRequestConversationsSuccess(response.data))
    )
    .catch(error => {
      dispatch(getTeachersRequestConversationsFailure(error))
      throw error
    })
}

export const getTeachersRequestConversationsId = (
  teachersRequestConversation: ConversationModels.RequestConversationInConversation
): GetTeachersRequestConversationsId => {
  return {
    payload: {
      teachersRequestConversation
    },
    type: GET_TEACHERS_REQUEST_CONVERSATIONS_ID
  }
}

export const clearTeachersRequestConversationsId = (): ClearTeachersRequestConversationsId => {
  return {
    type: CLEAR_TEACHERS_REQUEST_CONVERSATIONS_ID
  }
}

export const postApproveRequestConversationsRequest = (): PostApproveRequestConversationsRequest => {
  return {
    type: POST_APPROVE_REQUEST_CONVERSATIONS_REQUEST
  }
}

export const postApproveRequestConversationsSuccess = (
  teachersRequestConversation: ConversationModels.RequestConversationInConversation
): PostApproveRequestConversationsSuccess => {
  return {
    payload: {
      teachersRequestConversation
    },
    type: POST_APPROVE_REQUEST_CONVERSATIONS_SUCCESS
  }
}

export const postApproveRequestConversationsFailure = (
  error: any
): PostApproveRequestConversationsFailure => {
  return {
    payload: {
      error
    },
    type: POST_APPROVE_REQUEST_CONVERSATIONS_FAILURE
  }
}

export const postApproveRequestConversations = (
  authToken: string,
  conversationRequestId: number
) => (dispatch: Dispatch) => {
  dispatch(postApproveRequestConversationsRequest())
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios
    .patch(
      resolvePath.api(`conversation_requests/${conversationRequestId}`),
      null,
      config
    )
    .then(response =>
      dispatch(postApproveRequestConversationsSuccess(response.data))
    )
    .catch(error => {
      dispatch(postApproveRequestConversationsFailure(error))
      throw error
    })
}

export const postStartConversation = (
  authToken: string,
  conversationId: number
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  return axios.post(
    resolvePath.api(`conversations/${conversationId}/start`),
    null,
    config
  )
}

export interface State {
  bandwidth: number
  calendar: ConversationModels.Calendar
  cancelledConversation: ConversationModels.CancelledConversation | null
  chats: ConversationModels.Chats[]
  closeSoon: boolean
  conversation: ConversationModels.Conversation | null
  conversationMode: ConversationModels.ConversationMode
  currentTopic: string
  deletedConversation: ConversationModels.Conversation | null
  deletedRequestConversation: ConversationModels.RequestConversation | null
  endTime: string
  error: any
  evaluate: EvaluationsModels.Questionnaire | null
  evaluatedConversation: ConversationModels.Conversation | null
  isConnecting: boolean
  fetching: number
  isTopicsOpen: boolean
  memo: string
  page: number
  recommendedReservation: ConversationModels.Conversation | null
  recommendedReservations: ConversationModels.Conversation[]
  remainingTime: string
  reservations: ConversationModels.ConversationResponse | null
  reservationType: ConversationModels.ReservationType
  reservedConversation: ConversationModels.Conversation | null
  response: ConversationModels.Response | null
  selectedDate: string
  selectedMonth: number
  selectedYear: number
  serverTime: ConversationModels.ServerTime | null
  startTime: string
  studentsRequestConversation: ConversationModels.RequestConversation | null
  studentsRequestConversations: ConversationModels.RequestConversationResponse | null
  teachersRequestConversation: ConversationModels.RequestConversationInConversation | null
  teachersRequestConversations: ConversationModels.Conversation[] | null
  timeSelect: ConversationModels.TimeSelectType
  topics: ConversationModels.Topics
  youAreLate: boolean
}

const initialState: State = {
  bandwidth: 200,
  calendar: {},
  cancelledConversation: null,
  chats: [],
  closeSoon: false,
  conversation: null,
  conversationMode: 'video',
  currentTopic: '',
  deletedConversation: null,
  deletedRequestConversation: null,
  endTime: '15:00',
  error: undefined,
  evaluate: null,
  evaluatedConversation: null,
  isConnecting: false,
  fetching: 0,
  isTopicsOpen: false,
  memo: '',
  page: 1,
  recommendedReservation: null,
  recommendedReservations: [],
  remainingTime: '',
  reservations: null,
  reservationType: 'anyone',
  reservedConversation: null,
  response: null,
  selectedDate: '',
  selectedMonth: 1,
  selectedYear: 1970,
  serverTime: null,
  startTime: '10:00',
  studentsRequestConversation: null,
  studentsRequestConversations: null,
  teachersRequestConversation: null,
  teachersRequestConversations: [],
  timeSelect: 'from',
  topics: {},
  youAreLate: false
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FORWARD: {
      return {
        ...state,
        page: state.page + 1
      }
    }
    case BACK: {
      return {
        ...state,
        page: state.page - 1
      }
    }
    case CHANGE_YEAR: {
      return {
        ...state,
        selectedYear: action.payload.year
      }
    }
    case CHANGE_MONTH: {
      return {
        ...state,
        selectedMonth: action.payload.month
      }
    }
    case CHANGE_TIME_SELECT: {
      return {
        ...state,
        timeSelect: action.payload.type
      }
    }
    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload.date
      }
    }
    case SELECT_START_TIME: {
      return {
        ...state,
        startTime: action.payload.time
      }
    }
    case SELECT_END_TIME: {
      return {
        ...state,
        endTime: action.payload.time
      }
    }
    case SET_RESERVATION_TYPE: {
      return {
        ...state,
        reservationType: action.payload.reservationType
      }
    }
    case SET_CONNECTING: {
      return {
        ...state,
        isConnecting: true
      }
    }
    case CLEAR_CONNECTING: {
      return {
        ...state,
        isConnecting: false
      }
    }
    case UPDATE_REMAINING_TIME: {
      return {
        ...state,
        remainingTime: action.payload.remainingTime
      }
    }
    case SET_SERVER_TIME: {
      return {
        ...state,
        serverTime: { ...{}, ...action.payload.serverTime }
      }
    }
    case CHANGE_CONVERSATION_MODE: {
      return {
        ...state,
        conversationMode: action.payload.conversationMode
      }
    }
    case OPEN_TOPICS: {
      return {
        ...state,
        isTopicsOpen: true
      }
    }
    case CLOSE_TOPICS: {
      return {
        ...state,
        isTopicsOpen: false
      }
    }
    case SET_TOPICS: {
      return {
        ...state,
        topics: { ...{}, ...action.payload.topics }
      }
    }
    case OPEN_CHATS: {
      return {
        ...state,
        isOpened: true
      }
    }
    case CLOSE_CHATS: {
      return {
        ...state,
        isOpened: false
      }
    }
    case SET_CHATS: {
      return {
        ...state,
        chats: action.payload.chats
      }
    }
    case SET_CURRENT_TOPIC: {
      return {
        ...state,
        currentTopic: action.payload.currentTopic
      }
    }
    case SET_YOU_ARE_LATE: {
      return {
        ...state,
        youAreLate: true
      }
    }
    case CLEAR_YOU_ARE_LATE: {
      return {
        ...state,
        youAreLate: false
      }
    }
    case SET_CLOSE_SOON: {
      return {
        ...state,
        closeSoon: true
      }
    }
    case SET_BANDWIDTH: {
      return {
        ...state,
        bandwidth: action.payload.bandwidth
      }
    }
    case RESET_RECOMMENDED_RESERVATIONS: {
      return {
        ...state,
        recommendedReservations: []
      }
    }
    case SET_EVALUATION: {
      return {
        ...state,
        evaluate: action.payload.evaluate
      }
    }
    case POST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        response: action.payload.response
      }
    }
    case POST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        reservations: { ...{}, ...action.payload.reservations }
      }
    }
    case GET_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CONVERSATIONS_ID_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_CONVERSATIONS_ID_SUCCESS: {
      return {
        ...state,
        conversation: { ...{}, ...action.payload.conversation },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CONVERSATIONS_ID_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CANCELLED_CONVERSATIONS_ID_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_CANCELLED_CONVERSATIONS_ID_SUCCESS: {
      return {
        ...state,
        cancelledConversation: {
          ...{},
          ...action.payload.cancelledConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CANCELLED_CONVERSATIONS_ID_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case CLEAR_CONVERSATIONS_ID: {
      return {
        ...state,
        conversation: null
      }
    }
    case CLEAR_CANCELLED_CONVERSATIONS_ID: {
      return {
        ...state,
        cancelledConversation: null
      }
    }
    case DELETE_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case DELETE_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        deletedConversation: { ...{}, ...action.payload.deletedConversation },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case DELETE_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_EVALUATE_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_CONVERSATIONS_EVALUATE_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_EVALUATE_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_EVALUATE_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case PATCH_CONVERSATIONS_EVALUATE_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_EVALUATE_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_MEMO_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_CONVERSATIONS_MEMO_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_MEMO_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_MEMO_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case PATCH_CONVERSATIONS_MEMO_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_MEMO_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_REPORT_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_CONVERSATIONS_REPORT_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_CONVERSATIONS_REPORT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_REPORT_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case PATCH_CONVERSATIONS_REPORT_SUCCESS: {
      return {
        ...state,
        evaluatedConversation: {
          ...{},
          ...action.payload.evaluatedConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case PATCH_CONVERSATIONS_REPORT_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CALENDAR_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_CALENDAR_SUCCESS: {
      return {
        ...state,
        calendar: { ...{}, ...action.payload.calendar },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_CALENDAR_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_RECOMMEND_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_RECOMMEND_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        recommendedReservations: action.payload.recommendedReservations
      }
    }
    case GET_RECOMMEND_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_RECOMMEND_ID_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_RECOMMEND_ID_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        recommendedReservation: {
          ...{},
          ...action.payload.recommendedReservation
        }
      }
    }
    case GET_RECOMMEND_ID_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_RESERVE_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_RESERVE_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        reservedConversation: { ...{}, ...action.payload.reservedConversation }
      }
    }
    case POST_RESERVE_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case POST_REQUEST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_REQUEST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        reservedConversation: { ...{}, ...action.payload.reservedConversation }
      }
    }
    case POST_REQUEST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_STUDENTS_REQUEST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_STUDENTS_REQUEST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        studentsRequestConversations: {
          ...{},
          ...action.payload.studentsRequestConversations
        }
      }
    }
    case GET_STUDENTS_REQUEST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case DELETE_REQUEST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case DELETE_REQUEST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        deletedRequestConversation: {
          ...{},
          ...action.payload.deletedRequestConversation
        },
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case DELETE_REQUEST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_STUDENTS_REQUEST_CONVERSATIONS_ID: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        studentsRequestConversation: {
          ...{},
          ...action.payload.studentsRequestConversation
        }
      }
    }
    case CLEAR_STUDENTS_REQUEST_CONVERSATIONS_ID: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        studentsRequestConversations: null
      }
    }
    case GET_TEACHERS_REQUEST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case GET_TEACHERS_REQUEST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        teachersRequestConversations:
          action.payload.teachersRequestConversations
      }
    }
    case GET_TEACHERS_REQUEST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    case GET_TEACHERS_REQUEST_CONVERSATIONS_ID: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        teachersRequestConversation: {
          ...{},
          ...action.payload.teachersRequestConversation
        }
      }
    }
    case CLEAR_TEACHERS_REQUEST_CONVERSATIONS_ID: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        teachersRequestConversations: null
      }
    }
    case POST_APPROVE_REQUEST_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        fetching: state.fetching + 1
      }
    }
    case POST_APPROVE_REQUEST_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0,
        teachersRequestConversation: {
          ...{},
          ...action.payload.teachersRequestConversation
        }
      }
    }
    case POST_APPROVE_REQUEST_CONVERSATIONS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        fetching: state.fetching > 0 ? state.fetching - 1 : 0
      }
    }
    default: {
      return state
    }
  }
}
