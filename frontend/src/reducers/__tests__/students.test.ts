import assert from 'assert'
import { me as sampleMe } from 'mocks/sampleData/me'
import { userProfile as sampleUserProfile } from 'mocks/sampleData/userProfile'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import students, * as StudentsActions from 'reducers/students'

test('students/forward', () => {
  const initialState = students(undefined, StudentsActions.forward())
  assert(initialState.step === 2)
  const ret = students(initialState, StudentsActions.forward())
  assert(ret.step === 3)
})

test('students/back', () => {
  const initialState = students(undefined, StudentsActions.back())
  assert(initialState.step === 1)
  const ret = students(initialState, StudentsActions.back())
  assert(ret.step === 1)
})

test('students/register', () => {
  const info: StudentsModels.Info = {
    email: '',
    password: '',
    current_password: '',
    introduce: '',
    name: '',
    name_ja: '',
    gender: 0,
    picture: '',
    conversation_level: 0,
    level: 0,
    country: '',
    timezone: '',
    desired_condition: 0,
    hobbies: [],
    purposes: [],
    categories: [],
    tags: [],
    selected_tags: [],
    added_tags: [],
    sysp_nl: ''
  }
  const initialState = students(undefined, StudentsActions.register(info))
  assert(JSON.stringify(initialState.info) === JSON.stringify(info))
  info.email = 'sail@example.com'
  const ret = students(undefined, StudentsActions.register(info))
  assert(JSON.stringify(ret.info) === JSON.stringify(info))
})

test('students/resetInfo', () => {
  const info: StudentsModels.Info = {
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
  const initialState = students(undefined, StudentsActions.resetInfo())
  assert(
    JSON.stringify(initialState.info) === JSON.stringify(info) &&
      initialState.step === 1
  )
})

test('students/clearError', () => {
  const initialState = students(undefined, StudentsActions.clearError())
  assert(initialState.error === null)
})

test('students/getHobbiesRequest, students/getHobbiesSuccess, students/getHobbiesFailure', () => {
  const initialState = students(undefined, StudentsActions.getHobbiesRequest())
  assert(initialState.isFetching === true)
  const hobbies: SessionsModels.Hobbie[] = [
    {
      id: '1',
      name: 'music'
    }
  ]
  const success = students(
    undefined,
    StudentsActions.getHobbiesSuccess(hobbies)
  )
  assert(success.isFetching === false && success.hobbies === hobbies)
  const failure = students(
    undefined,
    StudentsActions.getHobbiesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/getPurposesRequest, students/getPurposesSuccess, students/getPurposesFailure', () => {
  const initialState = students(undefined, StudentsActions.getPurposesRequest())
  assert(initialState.isFetching === true)
  const purposes: SessionsModels.Purpose[] = [
    {
      id: '1',
      name: 'talk'
    }
  ]
  const success = students(
    undefined,
    StudentsActions.getPurposesSuccess(purposes)
  )
  assert(success.isFetching === false && success.purposes === purposes)
  const failure = students(
    undefined,
    StudentsActions.getPurposesFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/postMeRequest, students/postMeSuccess, students/postMeFailure', () => {
  const initialState = students(undefined, StudentsActions.postMeRequest())
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.postMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = students(undefined, StudentsActions.postMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/postSigninRequest, students/postSigninSuccess, students/postSigninFailure', () => {
  const initialState = students(undefined, StudentsActions.postSigninRequest())
  assert(initialState.isFetching === true)
  const success = students(
    undefined,
    StudentsActions.postSigninSuccess(sampleMe)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = students(
    undefined,
    StudentsActions.postSigninFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/getMeRequest, students/getMeSuccess, students/getMeFailure', () => {
  const initialState = students(undefined, StudentsActions.getMeRequest())
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.getMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = students(undefined, StudentsActions.getMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/patchMeRequest, students/patchMeSuccess, students/patchMeFailure', () => {
  const initialState = students(undefined, StudentsActions.patchMeRequest())
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.patchMeSuccess(sampleMe))
  assert(
    success.isFetching === false &&
      JSON.stringify(success.me) === JSON.stringify(sampleMe)
  )
  const failure = students(undefined, StudentsActions.patchMeFailure('error'))
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/postValidateRequest, students/postValidateSuccess, students/postValidateFailure', () => {
  const initialState = students(
    undefined,
    StudentsActions.postValidateRequest()
  )
  assert(initialState.isFetching === true)
  const success = students(
    undefined,
    StudentsActions.postValidateSuccess('success')
  )
  assert(success.isFetching === false && success.validation === 'success')
  const failure = students(
    undefined,
    StudentsActions.postValidateFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/deleteSignoutRequest, students/deleteSignoutSuccess, students/deleteSignoutFailure', () => {
  const initialState = students(
    undefined,
    StudentsActions.deleteSignoutRequest()
  )
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.deleteSignoutSuccess())
  assert(success.isFetching === false)
  const failure = students(
    undefined,
    StudentsActions.deleteSignoutFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/postPasswordRequest, students/postPasswordSuccess, students/postPasswordFailure', () => {
  const initialState = students(
    undefined,
    StudentsActions.postPasswordRequest()
  )
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.postPasswordSuccess())
  assert(
    success.isFetching === false && success.sentPasswordResetRequest === true
  )
  const failure = students(
    undefined,
    StudentsActions.postPasswordFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/patchPasswordRequest, students/patchPasswordSuccess, students/patchPasswordFailure', () => {
  const initialState = students(
    undefined,
    StudentsActions.patchPasswordRequest()
  )
  assert(initialState.isFetching === true)
  const success = students(undefined, StudentsActions.patchPasswordSuccess())
  assert(success.isFetching === false && success.isPasswordRenewed === true)
  const failure = students(
    undefined,
    StudentsActions.patchPasswordFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('students/getStudentRequest, students/getStudentSuccess, students/getStudentFailure', () => {
  const initialState = students(undefined, StudentsActions.getStudentRequest())
  assert(initialState.isFetching === true)
  const success = students(
    undefined,
    StudentsActions.getStudentSuccess(sampleUserProfile)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.otherUser) === JSON.stringify(sampleUserProfile)
  )
  const failure = students(
    undefined,
    StudentsActions.getStudentFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
