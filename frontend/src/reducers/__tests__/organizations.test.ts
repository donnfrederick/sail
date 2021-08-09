import assert from 'assert'
import * as sampleData from 'mocks/sampleData/organizations'
import organizations, * as OrganizationsActions from 'reducers/organizations'

test('organizations/open, organizations/close', () => {
  const initialState = organizations(undefined, OrganizationsActions.open())
  assert(initialState.isOpened === true)
  const closed = organizations(undefined, OrganizationsActions.close())
  assert(closed.isOpened === false)
})

test('organizations/postSigninRequest, organizations/postSigninSuccess, organizations/postSigninFailure', () => {
  const initialState = organizations(
    undefined,
    OrganizationsActions.postSigninRequest()
  )
  assert(initialState.isFetching === true)
  const success = organizations(
    undefined,
    OrganizationsActions.postSigninSuccess(sampleData.me)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleData.me)
  )
  const failure = organizations(
    undefined,
    OrganizationsActions.postSigninFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('organizations/getUsersRequest, organizations/getUsersSuccess, organizations/getUsersFailure', () => {
  const initialState = organizations(
    undefined,
    OrganizationsActions.getUsersRequest()
  )
  assert(initialState.isFetching === true)
  const success = organizations(
    undefined,
    OrganizationsActions.getUsersSuccess(sampleData.users)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.users) === JSON.stringify(sampleData.users)
  )
  const failure = organizations(
    undefined,
    OrganizationsActions.getUsersFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
