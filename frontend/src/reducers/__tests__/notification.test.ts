import assert from 'assert'
import * as Sample from 'mocks/sampleData/notification'
import * as NotificationModels from 'models/notification'
import notification, * as NotificationActions from 'reducers/notification'

test('notification/forward', () => {
  const initialState = notification(undefined, NotificationActions.forward())
  assert(initialState.page === 2)
})

test('notifications/clear', () => {
  const initialState = notification(undefined, NotificationActions.clear())
  assert(JSON.stringify(initialState.notifications) === JSON.stringify([]))
})

test('notification/getNotificationsRequest, notification/getNotificationsSuccess, notification/getNotificationsFailure', () => {
  const response: NotificationModels.NotificationsResponse = {
    data: Sample.notifications,
    meta: Sample.meta
  }
  const initialState = notification(
    undefined,
    NotificationActions.getNotificationsRequest()
  )
  assert(initialState.isFetching === true)
  const success = notification(
    undefined,
    NotificationActions.getNotificationsSuccess(response)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.notifications) === JSON.stringify(response.data) &&
      JSON.stringify(success.meta) === JSON.stringify(response.meta)
  )
  const failure = notification(
    undefined,
    NotificationActions.getNotificationsFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})

test('notification/getNotificationIdRequest, notification/getNotificationIdSuccess, notification/getNotificationIdFailure', () => {
  const initialState = notification(
    undefined,
    NotificationActions.getNotificationsIdRequest()
  )
  assert(initialState.isFetching === true)
  const success = notification(
    undefined,
    NotificationActions.getNotificationsIdSuccess(Sample.notification)
  )
  assert(
    success.isFetching === false &&
      JSON.stringify(success.notification) ===
        JSON.stringify(Sample.notification)
  )
  const failure = notification(
    undefined,
    NotificationActions.getNotificationsIdFailure('error')
  )
  assert(failure.isFetching === false && failure.error === 'error')
})
