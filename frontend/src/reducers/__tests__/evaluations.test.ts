import assert from 'assert'
import * as sample from 'mocks/sampleData/evaluations'
import evaluations, * as EvaluationsActions from 'reducers/evaluations'

test('evaluations/getEvaluationsRequest, evaluations/getEvaluationsSuccess, evaluations/getEvaluationsFailure', () => {
  const initialState = evaluations(
    undefined,
    EvaluationsActions.getEvaluationsRequest()
  )
  assert(initialState.isFetching === true)
  const success = evaluations(
    undefined,
    EvaluationsActions.getEvaluationsSuccess(sample.evaluations)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.data) === JSON.stringify(sample.evaluations)
  )
  const failure = evaluations(
    undefined,
    EvaluationsActions.getEvaluationsFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('evaluations/clearEvaluations', () => {
  const clear = evaluations(undefined, EvaluationsActions.clearEvaluations())
  assert(clear.isFetching === false && clear.data === null)
})
