## GET /api/v1/history.json
アクセスユーザーの会話履歴を取得します。この中にはブロック中のユーザーは含みません。.


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
GET /api/v1/history.json
Authorization: Bearer aw5kASDtte1vHtZyi3FMoBvr
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 3331,
      "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
      "status": "completed",
      "start_at": "2019-10-17T11:08:31+09:00",
      "end_at": "2019-10-17T11:33:31+09:00",
      "created_at": "2019-10-17T11:08:31+09:00",
      "updated_at": "2019-10-17T11:08:31+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-17T11:08:31+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-17T11:08:31+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-17T11:08:31+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-17T11:08:31+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3332,
      "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
      "status": "completed",
      "start_at": "2019-10-16T11:08:32+09:00",
      "end_at": "2019-10-16T11:33:32+09:00",
      "created_at": "2019-10-17T11:08:32+09:00",
      "updated_at": "2019-10-17T11:08:32+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-16T11:08:32+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-16T11:08:32+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-16T11:08:32+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-16T11:08:32+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3333,
      "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
      "status": "completed",
      "start_at": "2019-10-15T11:08:32+09:00",
      "end_at": "2019-10-15T11:33:32+09:00",
      "created_at": "2019-10-17T11:08:32+09:00",
      "updated_at": "2019-10-17T11:08:32+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-15T11:08:32+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-15T11:08:32+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-15T11:08:32+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-15T11:08:32+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3334,
      "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
      "status": "completed",
      "start_at": "2019-10-14T11:08:32+09:00",
      "end_at": "2019-10-14T11:33:32+09:00",
      "created_at": "2019-10-17T11:08:32+09:00",
      "updated_at": "2019-10-17T11:08:33+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-14T11:08:32+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-14T11:08:32+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-14T11:08:32+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-14T11:08:32+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3335,
      "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
      "status": "completed",
      "start_at": "2019-10-13T11:08:33+09:00",
      "end_at": "2019-10-13T11:33:33+09:00",
      "created_at": "2019-10-17T11:08:33+09:00",
      "updated_at": "2019-10-17T11:08:33+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-13T11:08:33+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-13T11:08:33+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-13T11:08:33+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-13T11:08:33+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3336,
      "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
      "status": "completed",
      "start_at": "2019-10-12T11:08:33+09:00",
      "end_at": "2019-10-12T11:33:33+09:00",
      "created_at": "2019-10-17T11:08:33+09:00",
      "updated_at": "2019-10-17T11:08:33+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-12T11:08:33+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-12T11:08:33+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-12T11:08:33+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-12T11:08:33+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3337,
      "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
      "status": "completed",
      "start_at": "2019-10-11T11:08:34+09:00",
      "end_at": "2019-10-11T11:33:34+09:00",
      "created_at": "2019-10-17T11:08:34+09:00",
      "updated_at": "2019-10-17T11:08:34+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-11T11:08:34+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-11T11:08:34+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-11T11:08:34+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-11T11:08:34+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3338,
      "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
      "status": "completed",
      "start_at": "2019-10-10T11:08:34+09:00",
      "end_at": "2019-10-10T11:33:34+09:00",
      "created_at": "2019-10-17T11:08:34+09:00",
      "updated_at": "2019-10-17T11:08:34+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-10T11:08:34+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-10T11:08:34+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-10T11:08:34+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-10T11:08:34+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3339,
      "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
      "status": "completed",
      "start_at": "2019-10-09T11:08:34+09:00",
      "end_at": "2019-10-09T11:33:34+09:00",
      "created_at": "2019-10-17T11:08:34+09:00",
      "updated_at": "2019-10-17T11:08:35+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-09T11:08:34+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-09T11:08:34+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-09T11:08:34+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-09T11:08:34+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
    },
    {
      "id": 3340,
      "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
      "status": "completed",
      "start_at": "2019-10-08T11:08:35+09:00",
      "end_at": "2019-10-08T11:33:35+09:00",
      "created_at": "2019-10-17T11:08:35+09:00",
      "updated_at": "2019-10-17T11:08:35+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2019-10-08T11:08:35+09:00",
          "memo": ""
        },
        {
          "timestamp": "2019-10-08T11:08:35+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2019-10-08T11:08:35+09:00",
          "report": null
        },
        {
          "timestamp": "2019-10-08T11:08:35+09:00",
          "report": null
        }
      ],
      "statuses": [
        "Absent",
        "Absent"
      ],
      "accepting_requests": false,
      "users": [
        {
          "id": 1586,
          "username": "teacher 106",
          "name": "まえかわ ゆうさく",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 1,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        },
        {
          "id": 1585,
          "username": "student 203",
          "name": "Miss Irwin",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "複雑な日本語での会話ができる",
          "conversation_level": "ほとんど分からない",
          "rated_conversation_level": null,
          "country": "タジキスタン",
          "timezone": "Asia/Dushanbe",
          "desired_condition": null,
          "evaluate": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
          },
          "location": null,
          "lateness": 0,
          "absence": 0,
          "is_favorite": false,
          "is_blocked": false,
          "payment_state": "free",
          "grade": "member",
          "highly_reliable": false,
          "conversations": [
            {
              "id": 3331,
              "channel_id": "c6b66210-7fcb-4cda-bc05-5a909c8c4800",
              "status": "completed",
              "start_at": "2019-10-17T11:08:31+09:00",
              "end_at": "2019-10-17T11:33:31+09:00",
              "created_at": "2019-10-17T11:08:31+09:00",
              "updated_at": "2019-10-17T11:08:31+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3332,
              "channel_id": "51387e2a-db41-46b4-ba00-d502b8adbc10",
              "status": "completed",
              "start_at": "2019-10-16T11:08:32+09:00",
              "end_at": "2019-10-16T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3333,
              "channel_id": "38031303-c2ef-4997-9918-25d15f4a92b0",
              "status": "completed",
              "start_at": "2019-10-15T11:08:32+09:00",
              "end_at": "2019-10-15T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:32+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3334,
              "channel_id": "7d4cf219-28c7-4bcd-8c57-e7aac1d7b757",
              "status": "completed",
              "start_at": "2019-10-14T11:08:32+09:00",
              "end_at": "2019-10-14T11:33:32+09:00",
              "created_at": "2019-10-17T11:08:32+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3335,
              "channel_id": "0fbcc9c3-ed4e-44f8-a23b-1035ccf6d680",
              "status": "completed",
              "start_at": "2019-10-13T11:08:33+09:00",
              "end_at": "2019-10-13T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3336,
              "channel_id": "2ab9f261-c7aa-47a9-853e-e6a80ced7610",
              "status": "completed",
              "start_at": "2019-10-12T11:08:33+09:00",
              "end_at": "2019-10-12T11:33:33+09:00",
              "created_at": "2019-10-17T11:08:33+09:00",
              "updated_at": "2019-10-17T11:08:33+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3337,
              "channel_id": "6ce5c42f-19ef-47da-b0f2-d3ac9bd45c27",
              "status": "completed",
              "start_at": "2019-10-11T11:08:34+09:00",
              "end_at": "2019-10-11T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3338,
              "channel_id": "c3dd4d03-7ff2-4544-b297-97b12393bc2e",
              "status": "completed",
              "start_at": "2019-10-10T11:08:34+09:00",
              "end_at": "2019-10-10T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:34+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3339,
              "channel_id": "d6f68fbf-2d47-4220-bfc8-3b3673c623eb",
              "status": "completed",
              "start_at": "2019-10-09T11:08:34+09:00",
              "end_at": "2019-10-09T11:33:34+09:00",
              "created_at": "2019-10-17T11:08:34+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3340,
              "channel_id": "0eb969e2-bf46-4c7b-a9c3-99f5e7ddf484",
              "status": "completed",
              "start_at": "2019-10-08T11:08:35+09:00",
              "end_at": "2019-10-08T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3341,
              "channel_id": "609fb821-1a2b-4770-a6c4-a609fe16e2f3",
              "status": "completed",
              "start_at": "2019-10-07T11:08:35+09:00",
              "end_at": "2019-10-07T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3342,
              "channel_id": "acbc96b1-c0e2-43a6-87ad-90c11d861447",
              "status": "completed",
              "start_at": "2019-10-06T11:08:35+09:00",
              "end_at": "2019-10-06T11:33:35+09:00",
              "created_at": "2019-10-17T11:08:35+09:00",
              "updated_at": "2019-10-17T11:08:35+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            },
            {
              "id": 3343,
              "channel_id": "293f561c-f810-4dfe-aadf-5585d128308b",
              "status": "completed",
              "start_at": "2019-10-05T11:08:36+09:00",
              "end_at": "2019-10-05T11:33:36+09:00",
              "created_at": "2019-10-17T11:08:36+09:00",
              "updated_at": "2019-10-17T11:08:36+09:00",
              "evaluate": [

              ],
              "with_self": true,
              "memos": [

              ],
              "statuses": [
                "Absent",
                "Absent"
              ],
              "accepting_requests": false
            }
          ],
          "hobbies": [

          ],
          "purposes": [

          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": true
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
