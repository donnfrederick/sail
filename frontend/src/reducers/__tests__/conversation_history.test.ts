import assert from 'assert'
import * as sample from 'mocks/sampleData/conversationHistory'
import conversationHistory, * as ConversationHistoryActions from 'reducers/conversation_history'

test('conversationHistory/forward', () => {
  const initialState = conversationHistory(
    undefined,
    ConversationHistoryActions.forward()
  )
  assert(initialState.page === 2)
})

test('conversationHistory/clear', () => {
  const initialState = conversationHistory(
    undefined,
    ConversationHistoryActions.clear()
  )
  assert(
    initialState.conversationHistory.length === 0 && initialState.page === 1
  )
})

test('conversationHistory/getConversationHistoryRequest, conversationHistory/getConversationHistorySuccess, conversationHistory/getConversationHistoryFailure', () => {
  const initialState = conversationHistory(
    undefined,
    ConversationHistoryActions.getConversationHistoryRequest()
  )
  assert(initialState.isFetching === true)
  const success = conversationHistory(
    undefined,
    ConversationHistoryActions.getConversationHistorySuccess(
      sample.conversationHistory
    )
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.conversationHistory) ===
        JSON.stringify(sample.conversationHistory.data) &&
      JSON.stringify(success.meta) ===
        JSON.stringify(sample.conversationHistory.meta)
  )
  const failure = conversationHistory(
    undefined,
    ConversationHistoryActions.getConversationHistoryFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
