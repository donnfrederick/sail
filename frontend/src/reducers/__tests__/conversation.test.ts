import assert from 'assert'
import * as sampleData from 'mocks/sampleData/conversation'
import * as ReservationModel from 'models/conversation'
import * as EvaluationsModel from 'models/evaluations'
import conversation, * as ConversationActions from 'reducers/conversation'

test('conversation/forward, conversation/back', () => {
  const initialState = conversation(undefined, ConversationActions.forward())
  assert(initialState.page === 2)
  const ret = conversation(undefined, ConversationActions.back())
  assert(ret.page === 0)
})

test('conversation/changeYear', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.changeYear(2012)
  )
  assert(initialState.selectedYear === 2012)
  const ret = conversation(undefined, ConversationActions.changeYear(1999))
  assert(ret.selectedYear === 1999)
})

test('conversation/changeMonth', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.changeMonth(1)
  )
  assert(initialState.selectedMonth === 1)
  const ret = conversation(undefined, ConversationActions.changeMonth(12))
  assert(ret.selectedMonth === 12)
})

test('conversation/changeTimeSelect', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.changeTimeSelect('from')
  )
  assert(initialState.timeSelect === 'from')
  const ret = conversation(
    undefined,
    ConversationActions.changeTimeSelect('zone')
  )
  assert(ret.timeSelect === 'zone')
})

test('conversation/selectDate', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.selectDate('2018-05-29')
  )
  assert(initialState.selectedDate === '2018-05-29')
  const ret = conversation(
    undefined,
    ConversationActions.selectDate('2020-01-01')
  )
  assert(ret.selectedDate === '2020-01-01')
})

test('conversation/selectStartTime', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.selectStartTime('00:00:00')
  )
  assert(initialState.startTime === '00:00:00')
  const ret = conversation(
    undefined,
    ConversationActions.selectStartTime('23:59:99')
  )
  assert(ret.startTime === '23:59:99')
})

test('conversation/selectEndTime', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.selectEndTime('00:00:00')
  )
  assert(initialState.endTime === '00:00:00')
  const ret = conversation(
    undefined,
    ConversationActions.selectEndTime('23:59:99')
  )
  assert(ret.endTime === '23:59:99')
})

test('conversation/setReservationType', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setReservationType('request')
  )
  assert(initialState.reservationType === 'request')
  const ret = conversation(
    initialState,
    ConversationActions.setReservationType('anyone')
  )
  assert(ret.reservationType === 'anyone')
})

test('conversation/setConnecting, conversation/clearConnecting', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setConnecting()
  )
  assert(initialState.isConnecting === true)
  const clear = conversation(undefined, ConversationActions.clearConnecting())
  assert(clear.isConnecting === false)
})

test('conversation/updateRemainingTime', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.updateRemainingTime('00:00')
  )
  assert(initialState.remainingTime === '00:00')
  const ret = conversation(
    undefined,
    ConversationActions.updateRemainingTime('59:99')
  )
  assert(ret.remainingTime === '59:99')
})

test('conversation/setServerTime', () => {
  const serverTime: ReservationModel.ServerTime = {
    current_time      : '2018-08-10T12:05:33+05:00',
    current_time_epoch: 1533884733,
    end_at            : '2018-08-10T07:25:00+05:00',
    end_at_epoch      : 1533867900
  }
  const initialState = conversation(
    undefined,
    ConversationActions.setServerTime(serverTime)
  )
  assert(JSON.stringify(serverTime) === JSON.stringify(initialState.serverTime))
})

test('conversation/changeConversationMode', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.changeConversationMode('video')
  )
  assert(initialState.conversationMode === 'video')
  const ret = conversation(
    undefined,
    ConversationActions.changeConversationMode('soundOnly')
  )
  assert(ret.conversationMode === 'soundOnly')
})

test('conversation/openTopics, conversation/closeTopics', () => {
  const initialState = conversation(undefined, ConversationActions.openTopics())
  assert(initialState.isTopicsOpen === true)
  const ret = conversation(undefined, ConversationActions.closeTopics())
  assert(ret.isTopicsOpen === false)
})

test('conversation/setTopics', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setTopics(sampleData.topics)
  )
  assert(
    JSON.stringify(initialState.topics) === JSON.stringify(sampleData.topics)
  )
})

test('conversation/setCurrentTopic', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setCurrentTopic('Art')
  )
  assert(initialState.currentTopic === 'Art')
})

test('conversation/setCloseSoon', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setCloseSoon()
  )
  assert(initialState.closeSoon === true)
})

test('conversation/setYouAreLate, conversation/clearYouAreLate', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setYouAreLate()
  )
  assert(initialState.youAreLate === true)
  const clear = conversation(undefined, ConversationActions.clearYouAreLate())
  assert(clear.youAreLate === false)
})

test('conversation/setBandwidth', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.setBandwidth(1000)
  )
  assert(initialState.bandwidth === 1000)
})

test('conversation/resetRecommendedReservations', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.resetRecommendedReservations()
  )
  assert(
    JSON.stringify(initialState.recommendedReservations) === JSON.stringify([])
  )
})

test('conversation/setEvaluation', () => {
  const evaluation: EvaluationsModel.Questionnaire = {
    fun    : 1,
    ability: 1,
    time   : 1,
    quality: [2, 3]
  }
  const initialState = conversation(
    undefined,
    ConversationActions.setEvaluation(evaluation)
  )
  assert(initialState.evaluate === evaluation)
})

test('conversation/postConversationsRequest, conversation/postConversationsSuccess, conversation/postConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const response: ReservationModel.Response = {
    channel_id: '8e85f8e2-ebad-40f2-98be-b88efea45b53',
    chats     : [],
    id        : 0,
    status    : '',
    start_at  : '',
    end_at    : '',
    created_at: '',
    updated_at: '',
    users     : []
  }
  const success = conversation(
    undefined,
    ConversationActions.postConversationsSuccess(response)
  )
  assert(success.fetching === 0 && success.response === response)
  const failure = conversation(
    undefined,
    ConversationActions.postConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getConversationsRequest, conversation/getConversationsSuccess conversation/getConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getConversationsSuccess(sampleData.conversations)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.reservations) ===
        JSON.stringify(sampleData.conversations)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getConversationsIdRequest, conversation/getConversationsIdSuccess conversation/getConversationsIdFailure conversation/clearConversationsId', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getConversationsIdRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getConversationsIdSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.conversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getConversationsIdFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
  const reset = conversation(
    success,
    ConversationActions.clearConversationsId()
  )
  assert(reset.conversation === null)
})

test('conversation/getCancelledConversationsIdRequest, conversation/getCancelledConversationsIdSuccess conversation/getCancelledConversationsIdFailure conversation/clearCancelledConversationsId', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getCancelledConversationsIdRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getCancelledConversationsIdSuccess(
      sampleData.cancelledConversation
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.cancelledConversation) ===
        JSON.stringify(sampleData.cancelledConversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getCancelledConversationsIdFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
  const reset = conversation(
    success,
    ConversationActions.clearCancelledConversationsId()
  )
  assert(reset.conversation === null)
})

test('conversation/deleteConversationsRequest, conversation/deleteConversationsSuccess, conversation/deleteConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.deleteConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.deleteConversationsSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.deletedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.deleteConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/postConversationsEvaluateRequest, conversation/postConversationsEvaluateSuccess, conversation/postConversationsEvaluateFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postConversationsEvaluateRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postConversationsEvaluateSuccess(
      sampleData.conversation
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postConversationsEvaluateFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/patchConversationsEvaluateRequest, conversation/patchConversationsEvaluateSuccess, conversation/patchConversationsEvaluateFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.patchConversationsEvaluateRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.patchConversationsEvaluateSuccess(
      sampleData.conversation
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.patchConversationsEvaluateFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getCalendarRequest, conversation/getCalendarSuccess, conversation/getCalendarFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getCalendarRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getCalendarSuccess(sampleData.calendar)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.calendar) === JSON.stringify(sampleData.calendar)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getCalendarFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getRecommendRequest, conversation/getRecommendSuccess, conversation/getRecommendFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getRecommendRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getRecommendSuccess([sampleData.conversation])
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.recommendedReservations) ===
        JSON.stringify([sampleData.conversation])
  )
  const failure = conversation(
    undefined,
    ConversationActions.getRecommendFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getRecommendIdRequest, conversation/getRecommendIdSuccess, conversation/getRecommendIdFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getRecommendIdRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getRecommendIdSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.recommendedReservation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getConversationsIdFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/postReserveRequest, conversation/postReserveSuccess, conversation/postReserveFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postReserveRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postReserveSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.reservedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postReserveFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/postConversationsMemoRequest, conversation/postConversationsMemoSuccess, conversation/postConversationsMemoFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postConversationsMemoRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postConversationsMemoSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postConversationsMemoFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/patchConversationsMemoRequest, conversation/patchConversationsMemoSuccess, conversation/patchConversationsMemoFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.patchConversationsMemoRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.patchConversationsMemoSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.patchConversationsMemoFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/postConversationsReportRequest, conversation/postConversationsReportSuccess, conversation/postConversationsReportFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postConversationsReportRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postConversationsReportSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postConversationsReportFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/patchConversationsReportRequest, conversation/patchConversationsReportSuccess, conversation/patchConversationsReportFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.patchConversationsReportRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.patchConversationsReportSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.evaluatedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.patchConversationsReportFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/postRequestConversationsRequest, conversation/postRequestConversationsSuccess, conversation/postRequestConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postRequestConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postRequestConversationsSuccess(sampleData.conversation)
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.reservedConversation) ===
        JSON.stringify(sampleData.conversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postRequestConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getStudentsRequestConversationsRequest, conversation/getStudentsRequestConversationsSuccess, conversation/getStudentsRequestConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getStudentsRequestConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getStudentsRequestConversationsSuccess(
      sampleData.requestConversations
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.studentsRequestConversations) ===
        JSON.stringify(sampleData.requestConversations)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getStudentsRequestConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/deleteRequestConversationsRequest, conversation/deleteRequestConversationsSuccess, conversation/deleteRequestConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.deleteRequestConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.deleteRequestConversationsSuccess(
      sampleData.requestConversations.data[0]
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.deletedRequestConversation) ===
        JSON.stringify(sampleData.requestConversations.data[0])
  )
  const failure = conversation(
    undefined,
    ConversationActions.deleteRequestConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getStudentsRequestConversationsId, conversation/clearStudentsRequestConversationsId', () => {
  const get = conversation(
    undefined,
    ConversationActions.getStudentsRequestConversationsId(
      sampleData.requestConversations.data[0]
    )
  )
  assert(
    JSON.stringify(get.studentsRequestConversation) ===
      JSON.stringify(sampleData.requestConversations.data[0])
  )
  const clear = conversation(
    undefined,
    ConversationActions.clearStudentsRequestConversationsId()
  )
  assert(clear.studentsRequestConversation === null)
})

test('conversation/getTeachersRequestConversationsRequest, conversation/getTeachersRequestConversationsSuccess, conversation/getTeachersRequestConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.getTeachersRequestConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.getTeachersRequestConversationsSuccess(
      sampleData.teachersRequestConversations
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.teachersRequestConversations) ===
        JSON.stringify(sampleData.teachersRequestConversations)
  )
  const failure = conversation(
    undefined,
    ConversationActions.getTeachersRequestConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})

test('conversation/getTeachersRequestConversationsId, conversation/clearTeachersRequestConversationsId', () => {
  const get = conversation(
    undefined,
    ConversationActions.getTeachersRequestConversationsId(
      sampleData.requestConversationInConversation
    )
  )
  assert(
    JSON.stringify(get.teachersRequestConversation) ===
      JSON.stringify(sampleData.requestConversationInConversation)
  )
  const clear = conversation(
    undefined,
    ConversationActions.clearTeachersRequestConversationsId()
  )
  assert(clear.teachersRequestConversation === null)
})

test('conversation/postApproveRequestConversationsRequest, conversation/postApproveRequestConversationsSuccess, conversation/postApproveRequestConversationsFailure', () => {
  const initialState = conversation(
    undefined,
    ConversationActions.postApproveRequestConversationsRequest()
  )
  assert(initialState.fetching === 1)
  const success = conversation(
    undefined,
    ConversationActions.postApproveRequestConversationsSuccess(
      sampleData.requestConversationInConversation
    )
  )
  assert(
    success.fetching === 0 &&
      JSON.stringify(success.teachersRequestConversation) ===
        JSON.stringify(sampleData.requestConversationInConversation)
  )
  const failure = conversation(
    undefined,
    ConversationActions.postApproveRequestConversationsFailure('error')
  )
  assert(failure.fetching === 0 && failure.error === 'error')
})
