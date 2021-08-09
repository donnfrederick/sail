export interface Notification {
  id: number
  image_url: string | null
  title: string
  body: string
  conversation_id?: number
  notificated_at: string
  notification_type: number
}

export interface Meta {
  current_page: number
  per_page: number
  previous_page: number
  next_page: number | null
  total_pages: number
  total_entries: number
}

export interface NotificationsRequest {
  page?: number
  per_page?: number
}

export interface NotificationsResponse {
  data: Notification[]
  meta: Meta
}

export enum NotificationTypes {
  'arrangement' = 1,
  'reminder',
  'cancellation'
}

export const notificationText = {
  student: {
    [NotificationTypes.reminder]:
      'Sudden cancellation may inconvenience the person you’ve matched with. Please refrain from cancelling conversations except in cases of emergency.',
    [NotificationTypes.cancellation]:
      'Please find another senior if you wish to talk.',
    cancelledConversation: 'This conversation has been cancelled.'
  },
  teacher: {
    [NotificationTypes.reminder]:
      '直前での予約取り消しは可能な限り避けましょう。どうしても会話できない事情がある場合のみ、予約取り消しを行ってください。',
    [NotificationTypes.cancellation]:
      '他の日時を検討すると良いかもしれません。',
    cancelledConversation: 'この会話はキャンセルされました。'
  }
}
