import assert from 'assert'
import * as sampleData from 'mocks/sampleData/locations'
import locations, * as LocationsActions from 'reducers/locations'

test('locations/getCountriesRequest, locations/getCountriesSuccess, locations/getCountriesFailure', () => {
  const initialState = locations(
    undefined,
    LocationsActions.getCountriesRequest()
  )
  assert(initialState.isFetching === true)
  const success = locations(
    undefined,
    LocationsActions.getCountriesSuccess(sampleData.countries)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.countries) === JSON.stringify(sampleData.countries)
  )
  const failure = locations(
    undefined,
    LocationsActions.getCountriesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('locations/getTimezonesRequest, locations/getTimezonesSuccess, locations/getTimezonesFailure', () => {
  const initialState = locations(
    undefined,
    LocationsActions.getTimezonesRequest()
  )
  assert(initialState.isFetching === true)
  const success = locations(
    undefined,
    LocationsActions.getTimezonesSuccess(sampleData.timezones)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.timezones) === JSON.stringify(sampleData.timezones)
  )
  const failure = locations(
    undefined,
    LocationsActions.getTimezonesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
