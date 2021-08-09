import assert from 'assert'
import { me as sampleMe } from 'mocks/sampleData/me'
import { userProfile as sampleUserProfile } from 'mocks/sampleData/userProfile'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import teachers, * as TeachersActions from 'reducers/teachers'

test('teachers/forward', () => {
  const initialState = teachers(undefined, TeachersActions.forward())
  assert(initialState.step === 2)
  const ret = teachers(initialState, TeachersActions.forward())
  assert(ret.step === 3)
})

test('teachers/back', () => {
  const initialState = teachers(undefined, TeachersActions.back())
  assert(initialState.step === 1)
  const ret = teachers(initialState, TeachersActions.back())
  assert(ret.step === 1)
})

test('teachers/confirm, teachers/cancel', () => {
  const initialState = teachers(undefined, TeachersActions.confirm())
  assert(initialState.showConfirmation === true)
  const ret = teachers(undefined, TeachersActions.cancel())
  assert(ret.showConfirmation === false)
})

test('teachers/register', () => {
  const info: TeachersModels.Info = {
    email: '',
    password: '',
    name: '',
    gender: '',
    picture: '',
    hobbies: [],
    purposes: [],
    desiredCondition: '',
    introduce: '',
    categories: [],
    tags: [],
    selected_tags: [],
    added_tags: []
  }
  const initialState = teachers(undefined, TeachersActions.register(info))
  assert(JSON.stringify(initialState.info) === JSON.stringify(info))
  info.email = 'sail@example.com'
  const ret = teachers(undefined, TeachersActions.register(info))
  assert(JSON.stringify(ret.info) === JSON.stringify(info))
})

test('teachers/resetInfo', () => {
  const info: TeachersModels.Info = {
    desiredCondition: '',
    email: '',
    gender: '',
    hobbies: [],
    introduce: '',
    name: '',
    password: '',
    picture: '',
    purposes: [],
    categories: [],
    tags: [],
    selected_tags: [],
    added_tags: []
  }
  const initialState = teachers(undefined, TeachersActions.resetInfo())
  assert(
    JSON.stringify(initialState.info) === JSON.stringify(info) &&
      initialState.step === 1
  )
})

test('teachers/clearError', () => {
  const initialState = teachers(undefined, TeachersActions.clearError())
  assert(initialState.error === null)
})

test('teachers/setCurrentPassword', () => {
  const initialState = teachers(
    undefined,
    TeachersActions.setCurrentPassword('current_password')
  )
  assert(initialState.current_password === 'current_password')
  const ret = teachers(
    undefined,
    TeachersActions.setCurrentPassword('new_password')
  )
  assert(ret.current_password === 'new_password')
})

test('teachers/getHobbiesRequest, teachers/getHobbiesSuccess, teachers/getHobbiesFailure', () => {
  const initialState = teachers(undefined, TeachersActions.getHobbiesRequest())
  assert(initialState.isFetching === true)
  const hobbies: SessionsModels.Hobbie[] = [
    {
      id: '1',
      name: 'music'
    }
  ]
  const success = teachers(
    undefined,
    TeachersActions.getHobbiesSuccess(hobbies)
  )
  assert(success.isFetching === false && success.hobbies === hobbies)
  const failure = teachers(
    undefined,
    TeachersActions.getHobbiesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/getPurposesRequest, teachers/getPurposesSuccess, teachers/getPurposesFailure', () => {
  const initialState = teachers(undefined, TeachersActions.getPurposesRequest())
  assert(initialState.isFetching === true)
  const purposes: SessionsModels.Purpose[] = [
    {
      id: '1',
      name: 'talk'
    }
  ]
  const success = teachers(
    undefined,
    TeachersActions.getPurposesSuccess(purposes)
  )
  assert(success.isFetching === false && success.purposes === purposes)
  const failure = teachers(
    undefined,
    TeachersActions.getPurposesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/postMeRequest, teachers/postMeSuccess, teachers/postMeFailure', () => {
  const initialState = teachers(undefined, TeachersActions.postMeRequest())
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.postMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = teachers(undefined, TeachersActions.postMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/postSigninRequest, teachers/postSigninSuccess, teachers/postSigninFailure', () => {
  const initialState = teachers(undefined, TeachersActions.postSigninRequest())
  assert(initialState.isFetching === true)
  const success = teachers(
    undefined,
    TeachersActions.postSigninSuccess(sampleMe)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = teachers(
    undefined,
    TeachersActions.postSigninFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/getMeRequest, teachers/getMeSuccess, teachers/getMeFailure', () => {
  const initialState = teachers(undefined, TeachersActions.getMeRequest())
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.getMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = teachers(undefined, TeachersActions.getMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/patchMeRequest, teachers/patchMeSuccess, teachers/patchMeFailure', () => {
  const initialState = teachers(undefined, TeachersActions.patchMeRequest())
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.patchMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = teachers(undefined, TeachersActions.patchMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/postValidateRequest, teachers/postValidateSuccess, teachers/postValidateFailure', () => {
  const initialState = teachers(
    undefined,
    TeachersActions.postValidateRequest()
  )
  assert(initialState.isFetching === true)
  const success = teachers(
    undefined,
    TeachersActions.postValidateSuccess('success')
  )
  assert(success.isFetching === false && success.validation === 'success')
  const failure = teachers(
    undefined,
    TeachersActions.postValidateFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/deleteSignoutRequest, teachers/deleteSignoutSuccess, teachers/deleteSignoutFailure', () => {
  const initialState = teachers(
    undefined,
    TeachersActions.deleteSignoutRequest()
  )
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.deleteSignoutSuccess())
  assert(success.isFetching === false)
  const failure = teachers(
    undefined,
    TeachersActions.deleteSignoutFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/postPasswordRequest, teachers/postPasswordSuccess, teachers/postPasswordFailure', () => {
  const initialState = teachers(
    undefined,
    TeachersActions.postPasswordRequest()
  )
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.postPasswordSuccess())
  assert(
    success.isFetching === false && success.sentPasswordResetRequest === true
  )
  const failure = teachers(
    undefined,
    TeachersActions.postPasswordFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/patchPasswordRequest, teachers/patchPasswordSuccess, teachers/patchPasswordFailure', () => {
  const initialState = teachers(
    undefined,
    TeachersActions.patchPasswordRequest()
  )
  assert(initialState.isFetching === true)
  const success = teachers(undefined, TeachersActions.patchPasswordSuccess())
  assert(success.isFetching === false && success.isPasswordRenewed === true)
  const failure = teachers(
    undefined,
    TeachersActions.patchPasswordFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('teachers/getTeacherRequest, teachers/getTeacherSuccess, teachers/getTeacherFailure', () => {
  const initialState = teachers(undefined, TeachersActions.getTeacherRequest())
  assert(initialState.isFetching === true)
  const success = teachers(
    undefined,
    TeachersActions.getTeacherSuccess(sampleUserProfile)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.otherUser) === JSON.stringify(sampleUserProfile)
  )
  const failure = teachers(
    undefined,
    TeachersActions.getTeacherFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
