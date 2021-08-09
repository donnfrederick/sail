import assert from 'assert'
import environments, * as EnvironmentsActions from 'reducers/environments'

test('environments/getEnvironmentsRequest, environments/getEnvironmentsSuccess, environments/getEnvironmentsFailure', () => {
  const sample = {
    sora_signaling_url: 'wss://sora1d.sail.helte.jp/signaling',
    sora_api_url: 'https://sora1d.sail.helte.jp:443/api',
    app_socket_url: 'ws://localhost:3000/cable/v1?ws_token='
  }
  const initialState = environments(
    undefined,
    EnvironmentsActions.getEnvironmentsRequest()
  )
  assert(initialState.isFetching === true)
  const success = environments(
    undefined,
    EnvironmentsActions.getEnvironmentsSuccess(sample)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.environments) === JSON.stringify(sample)
  )
  const failure = environments(
    undefined,
    EnvironmentsActions.getEnvironmentsFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
