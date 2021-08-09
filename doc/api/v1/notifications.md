## GET /api/v1/notifications.json
Returns some notifications.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
page | integer | optional |  | Default: 1<br>ページ番号
per_page | integer | optional |  | Default: 10<br>1ページあたりの件数



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/notifications.json
Authorization: Bearer URSsCU5aLFo5AXTXJScYf4YJ
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 6298,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1ダミータイトル 1",
      "body": "ダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\nダミー本文 1\n",
      "notificated_at": "2019-10-17T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6299,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2ダミータイトル 2",
      "body": "ダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\nダミー本文 2\n",
      "notificated_at": "2019-10-16T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6300,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3ダミータイトル 3",
      "body": "ダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\nダミー本文 3\n",
      "notificated_at": "2019-10-15T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6301,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4ダミータイトル 4",
      "body": "ダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\nダミー本文 4\n",
      "notificated_at": "2019-10-14T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6302,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5ダミータイトル 5",
      "body": "ダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\nダミー本文 5\n",
      "notificated_at": "2019-10-13T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6303,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6ダミータイトル 6",
      "body": "ダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\nダミー本文 6\n",
      "notificated_at": "2019-10-12T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6304,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7ダミータイトル 7",
      "body": "ダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\nダミー本文 7\n",
      "notificated_at": "2019-10-11T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6305,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8ダミータイトル 8",
      "body": "ダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\nダミー本文 8\n",
      "notificated_at": "2019-10-10T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6306,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9ダミータイトル 9",
      "body": "ダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\nダミー本文 9\n",
      "notificated_at": "2019-10-09T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    },
    {
      "id": 6307,
      "image_url": "/assets/img/common/notification-official.png",
      "title": "ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10ダミータイトル 10",
      "body": "ダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\nダミー本文 10\n",
      "notificated_at": "2019-10-08T11:08:58+09:00",
      "conversation_id": 3383,
      "notification_type": 0
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "previous_page": null,
    "next_page": 2,
    "total_pages": 2,
    "total_entries": 13
  }
}
```

## GET /api/v1/notifications/:id.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/notifications/6382.json
Authorization: Bearer vcfuagQsU68YSxXoJQAZwZts
Host: www.example.com
```

#### Response

```json
200


{
  "id": 6382,
  "image_url": "/assets/img/common/user@3x.png",
  "title": "ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85ダミータイトル 85",
  "body": "ダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\nダミー本文 85\n",
  "notificated_at": "2019-10-17T10:59:08+09:00",
  "conversation_id": 3389,
  "notification_type": 0
}
```

## GET /api/v1/notifications/stats.json
Returns unread count.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/notifications/stats.json
Authorization: Bearer AnecAmzvphkbfi45HqnEMhaE
Host: www.example.com
```

#### Response

```json
200


{
  "unread_count": 7
}
```
