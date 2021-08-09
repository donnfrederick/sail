import assert from 'assert'
import * as sample from 'mocks/sampleData/accusations'
import accusations, * as AccusationsActions from 'reducers/accusations'

test('accusations/select', () => {
  const initialState = accusations(undefined, AccusationsActions.select(1))
  assert(initialState.selectedReasonId === 1)
  const ret = accusations(undefined, AccusationsActions.select(2))
  assert(ret.selectedReasonId === 2)
})

test('accusations/getAccusationsReasonsRequest, accusations/getAccusationsReasonsSuccess, accusations/getAccusationsReasonsFailure', () => {
  const initialState = accusations(
    undefined,
    AccusationsActions.getAccusationsReasonsRequest()
  )
  assert(initialState.isFetching === true)
  const success = accusations(
    undefined,
    AccusationsActions.getAccusationsReasonsSuccess(sample.reasons)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.reasons) === JSON.stringify(sample.reasons)
  )
  const failure = accusations(
    undefined,
    AccusationsActions.getAccusationsReasonsFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('accusations/postAccusationsRequest, accusations/postAccusationsSuccess, accusations/postAccusationsFailure', () => {
  const initialState = accusations(
    undefined,
    AccusationsActions.postAccusationsRequest()
  )
  assert(initialState.isFetching === true)
  const success = accusations(
    undefined,
    AccusationsActions.postAccusationsSuccess(sample.accusationsResponse)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.response) ===
        JSON.stringify(sample.accusationsResponse)
  )
  const failure = accusations(
    undefined,
    AccusationsActions.postAccusationsFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
