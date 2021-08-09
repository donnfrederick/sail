## GET /api/v1/conversations.json
Returns some conversations.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
start_on | date | optional | Format<br>"%Y/%m/%d"<br>"%Y.%m.%d"<br>"%Y-%m-%d" | Default: null<br>開始日 'end_on' と組み合わせて使用します。<br>※ 'term', 'page' とは併用できません
end_on | date | optional | Format<br>"%Y/%m/%d"<br>"%Y.%m.%d"<br>"%Y-%m-%d" | Default: null<br>終了日 'start_on' と組み合わせて使用します。 <br>※ 'term', 'page' とは併用できません
term | string | optional | Only<br>["week", "month"] | Default: null<br>週単位、月単位で予約情報を取得します<br>week: 週単位, month: 月単位<br>※ 'page' と併用することができ、'start_on', 'end_on' とは併用できません）
page | integer | optional |  | Default: 1<br>1: 今週 (or 今月), 2: 来週 (or 来月), ...<br>※ 'term' と併用することができ、'start_on', 'end_on' とは併用できません）



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations.json?start_on=2018-01-02&end_on=2018-01-05
Authorization: Bearer QbiiV93Wp7FRAfQy6aCHm7dJ
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 2582,
      "channel_id": "0b22423b-683b-4e9b-a0e2-749a344cc470",
      "status": "queued",
      "start_at": "2018-01-02T00:00:00+09:00",
      "end_at": "2018-01-02T00:25:00+09:00",
      "created_at": "2018-01-01T00:00:00+09:00",
      "updated_at": "2018-01-01T00:00:00+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2018-01-02T00:00:00+09:00",
          "memo": ""
        },
        {
          "timestamp": "2018-01-02T00:00:00+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2018-01-02T00:00:00+09:00",
          "report": null
        },
        {
          "timestamp": "2018-01-02T00:00:00+09:00",
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
          "id": 1359,
          "username": "teacher 15",
          "name": "かわはら かずまさ",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 2,
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        },
        {
          "id": 1360,
          "username": "student 68",
          "name": "Stefan Abshire",
          "type": "Student",
          "sex": 1,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "基本的な日本語での会話ができる",
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": false
    },
    {
      "id": 2583,
      "channel_id": "a37b9d79-257b-4a50-964e-ac2bfbed1323",
      "status": "queued",
      "start_at": "2018-01-03T00:00:00+09:00",
      "end_at": "2018-01-03T00:25:00+09:00",
      "created_at": "2018-01-01T00:00:00+09:00",
      "updated_at": "2018-01-01T00:00:00+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2018-01-03T00:00:00+09:00",
          "memo": ""
        },
        {
          "timestamp": "2018-01-03T00:00:00+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2018-01-03T00:00:00+09:00",
          "report": null
        },
        {
          "timestamp": "2018-01-03T00:00:00+09:00",
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
          "id": 1359,
          "username": "teacher 15",
          "name": "かわはら かずまさ",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 2,
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        },
        {
          "id": 1360,
          "username": "student 68",
          "name": "Stefan Abshire",
          "type": "Student",
          "sex": 1,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "基本的な日本語での会話ができる",
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": false
    },
    {
      "id": 2584,
      "channel_id": "39dc2065-e009-440b-9958-f0a8b83c5eea",
      "status": "queued",
      "start_at": "2018-01-04T00:00:00+09:00",
      "end_at": "2018-01-04T00:25:00+09:00",
      "created_at": "2018-01-01T00:00:00+09:00",
      "updated_at": "2018-01-01T00:00:00+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2018-01-04T00:00:00+09:00",
          "memo": ""
        },
        {
          "timestamp": "2018-01-04T00:00:00+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2018-01-04T00:00:00+09:00",
          "report": null
        },
        {
          "timestamp": "2018-01-04T00:00:00+09:00",
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
          "id": 1359,
          "username": "teacher 15",
          "name": "かわはら かずまさ",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 2,
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        },
        {
          "id": 1360,
          "username": "student 68",
          "name": "Stefan Abshire",
          "type": "Student",
          "sex": 1,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "基本的な日本語での会話ができる",
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": false
    },
    {
      "id": 2585,
      "channel_id": "84a5eed2-6c3c-48da-b81e-99edea1d6d6e",
      "status": "queued",
      "start_at": "2018-01-05T00:00:00+09:00",
      "end_at": "2018-01-05T00:25:00+09:00",
      "created_at": "2018-01-01T00:00:00+09:00",
      "updated_at": "2018-01-01T00:00:00+09:00",
      "evaluate": [

      ],
      "with_self": true,
      "memos": [
        {
          "timestamp": "2018-01-05T00:00:00+09:00",
          "memo": ""
        },
        {
          "timestamp": "2018-01-05T00:00:00+09:00",
          "memo": ""
        }
      ],
      "reports": [
        {
          "timestamp": "2018-01-05T00:00:00+09:00",
          "report": null
        },
        {
          "timestamp": "2018-01-05T00:00:00+09:00",
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
          "id": 1359,
          "username": "teacher 15",
          "name": "かわはら かずまさ",
          "type": "Teacher",
          "sex": 2,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": null,
          "conversation_level": "まだ評価はありません",
          "rated_conversation_level": null,
          "country": "日本",
          "timezone": "Asia/Tokyo",
          "desired_condition": 2,
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        },
        {
          "id": 1360,
          "username": "student 68",
          "name": "Stefan Abshire",
          "type": "Student",
          "sex": 1,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "基本的な日本語での会話ができる",
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "料理"
            },
            {
              "id": 2,
              "name": "読書"
            },
            {
              "id": 3,
              "name": "スポーツ"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "若い人との会話を楽しみたい"
            },
            {
              "id": 2,
              "name": "若い世代に貢献したい"
            },
            {
              "id": 3,
              "name": "仕事や日常の経験を伝えたい"
            }
          ]
        }
      ],
      "conversation_requests": [

      ],
      "available": false
    }
  ],
  "include": {
    "users": [
      "hobbies",
      "purposes",
      "favorites",
      "blocks"
    ]
  },
  "meta": {
    "start_on": "2018-01-02T00:00:00+09:00",
    "end_on": "2018-01-05T23:59:59+09:00"
  }
}
```

## GET /api/v1/conversations/:id.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/2682.json
Authorization: Bearer D9cn1KQNzyK8P5EvQd7hrESA
Host: www.example.com
```

#### Response

```json
200


{
  "id": 2682,
  "channel_id": "17f614a3-0753-4bb2-b149-d45924004ea2",
  "status": "queued",
  "start_at": "2018-01-02T00:00:00+09:00",
  "end_at": "2018-01-02T00:25:00+09:00",
  "created_at": "2018-01-01T00:00:00+09:00",
  "updated_at": "2018-01-01T00:00:00+09:00",
  "evaluate": [

  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-01-02T00:00:00+09:00",
      "memo": ""
    },
    {
      "timestamp": "2018-01-02T00:00:00+09:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-01-02T00:00:00+09:00",
      "report": null
    },
    {
      "timestamp": "2018-01-02T00:00:00+09:00",
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
      "id": 1379,
      "username": "teacher 25",
      "name": "ふじもと さとし",
      "type": "Teacher",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": "まだ評価はありません",
      "rated_conversation_level": null,
      "country": "日本",
      "timezone": "Asia/Tokyo",
      "desired_condition": 2,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    },
    {
      "id": 1380,
      "username": "student 78",
      "name": "Werner Stanton",
      "type": "Student",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を合格したことがない",
      "conversation_level": "日常会話が可能",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## POST /api/v1/conversations.json
Return conversation.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
start_at | time | **required** | Format<br>"%Y-%m-%d %H:%M:%S"<br>"%Y-%m-%dT%H:%M:%SZ"<br>"%Y-%m-%dT%H:%M:%S%:z" | Default: null<br>予約の希望開始日時
end_at | time | optional | Format<br>"%Y-%m-%d %H:%M:%S"<br>"%Y-%m-%dT%H:%M:%SZ"<br>"%Y-%m-%dT%H:%M:%S%:z" | Default: null<br>予約の希望終了日時
accepting_requests | integer | optional | Only<br>[0, 1] | リクエスト枠予約かどうかの値<br>0: 通常予約, 1: リクエスト枠予約



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations.json
Authorization: Bearer ak3uiypn63VAnGbJJM3WeiEL
Host: www.example.com

start_at=2018-02-01T00%3A00%3A00%2B09%3A00&end_at=2018-02-01T00%3A25%3A00%2B09%3A00
```

#### Response

```json
201


{
  "id": 2712,
  "channel_id": "9778a32a-3c69-4765-9f30-82ccd4bad14a",
  "status": "waiting",
  "start_at": "2018-02-01T00:00:00+09:00",
  "end_at": "2018-02-01T00:25:00+09:00",
  "created_at": "2018-01-01T00:00:00+09:00",
  "updated_at": "2018-01-01T00:00:00+09:00",
  "evaluate": [

  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-02-01T00:00:00+09:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-02-01T00:00:00+09:00",
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
      "id": 1383,
      "username": "teacher 27",
      "name": "ちば あやは",
      "type": "Teacher",
      "sex": 1,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## POST /api/v1/conversations.json
Return conversation.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
start_at | time | **required** | Format<br>"%Y-%m-%d %H:%M:%S"<br>"%Y-%m-%dT%H:%M:%SZ"<br>"%Y-%m-%dT%H:%M:%S%:z" | Default: null<br>予約の希望開始日時
end_at | time | optional | Format<br>"%Y-%m-%d %H:%M:%S"<br>"%Y-%m-%dT%H:%M:%SZ"<br>"%Y-%m-%dT%H:%M:%S%:z" | Default: null<br>予約の希望終了日時
accepting_requests | integer | optional | Only<br>[0, 1] | リクエスト枠予約かどうかの値<br>0: 通常予約, 1: リクエスト枠予約



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations.json
Authorization: Bearer zP7ahqzjU6t239VHLQgmbTHX
Host: www.example.com

start_at=2018-04-01T00%3A00%3A00%2B09%3A00&end_at=2018-04-01T00%3A25%3A00%2B09%3A00&accepting_requests=1
```

#### Response

```json
201


{
  "id": 2778,
  "channel_id": "f2a02e8c-e400-4c9d-a8fd-9be3ac61a907",
  "status": "waiting",
  "start_at": "2018-04-01T00:00:00+09:00",
  "end_at": "2018-04-01T00:25:00+09:00",
  "created_at": "2018-01-01T00:00:00+09:00",
  "updated_at": "2018-01-01T00:00:00+09:00",
  "evaluate": [

  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-04-01T00:00:00+09:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-04-01T00:00:00+09:00",
      "report": null
    }
  ],
  "statuses": [
    "Absent",
    "Absent"
  ],
  "accepting_requests": true,
  "users": [
    {
      "id": 1395,
      "username": "teacher 33",
      "name": "ほった すみか",
      "type": "Teacher",
      "sex": 1,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## POST /api/v1/conversations/:id/evaluate2.json
Return conversation.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
fun | integer | optional | Only<br>[1, 2, 3, 4, 5] | 会話は楽しめましたか<br>1: 談笑できた, 2: 感動した, 3: 新しい発見があった, 4: その他よかった, 5: 不満がある
ability | integer | optional | Only<br>[1, 2, 3, 4, 5] | 日本語レベルはどうでしたか<br>1: スムーズに会話ができた, 2: たまに単語が出ないでつまずいた, 3: 続くけどしどろもどろ, 4: あまり続かない, 5: まったく会話にならない
time | integer | optional | Only<br>[1, 2, 3, 4] | 時間どおりに現れましたか<br>1: 時間通りに来た, 2: 少し遅刻した, 3: 5分以上遅刻した, 4: 来なかった
quality | array | **required** |  | 映像や音声の質はどうでしたか<br>1: 映像がたまに切れていた, 2: まったく映らなかった, 3: 周囲の雑音が多かった, 4: 音声がブツブツ切れていた



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations/2864/evaluate2.json
Authorization: Bearer FYRXhix6rh8BS4fnLCw8hddy
Host: www.example.com

fun=4&ability=1&time=1&quality[]=1&quality[]=2&quality[]=3
```

#### Response

```json
200


{
  "id": 2864,
  "channel_id": "b8a5dc12-b98c-4ee6-b52c-4ea4df7a801b",
  "status": "queued",
  "start_at": "2018-01-14T00:00:00+09:00",
  "end_at": "2018-01-14T00:25:00+09:00",
  "created_at": "2018-01-01T00:00:00+09:00",
  "updated_at": "2018-01-01T00:00:00+09:00",
  "evaluate": [
    {
      "user_id": 1413,
      "evaluate": {
        "fun": 4,
        "ability": 1,
        "time": 1,
        "quality": [

        ]
      }
    }
  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "memo": ""
    },
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "report": null
    },
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "report": null
    }
  ],
  "statuses": [
    "Ontime",
    "Online"
  ],
  "accepting_requests": false,
  "users": [
    {
      "id": 1413,
      "username": "teacher 43",
      "name": "みやがわ ゆずみ",
      "type": "Teacher",
      "sex": 1,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": "まだ評価はありません",
      "rated_conversation_level": null,
      "country": "日本",
      "timezone": "Asia/Tokyo",
      "desired_condition": 2,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    },
    {
      "id": 1414,
      "username": "student 94",
      "name": "Leonard Rohan",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を合格したことがない",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## POST /api/v1/conversations/:id/evaluate2.json
Return conversation.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
fun | integer | optional | Only<br>[1, 2, 3, 4, 5] | 会話は楽しめましたか<br>1: 談笑できた, 2: 感動した, 3: 新しい発見があった, 4: その他よかった, 5: 不満がある
ability | integer | optional | Only<br>[1, 2, 3, 4, 5] | 日本語レベルはどうでしたか<br>1: スムーズに会話ができた, 2: たまに単語が出ないでつまずいた, 3: 続くけどしどろもどろ, 4: あまり続かない, 5: まったく会話にならない
time | integer | optional | Only<br>[1, 2, 3, 4] | 時間どおりに現れましたか<br>1: 時間通りに来た, 2: 少し遅刻した, 3: 5分以上遅刻した, 4: 来なかった
quality | array | **required** |  | 映像や音声の質はどうでしたか<br>1: 映像がたまに切れていた, 2: まったく映らなかった, 3: 周囲の雑音が多かった, 4: 音声がブツブツ切れていた



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations/2886/evaluate2.json
Authorization: Bearer yj5XCpYAVGZ9BKjM19z42i9C
Host: www.example.com

fun=4&ability=1&time=1&quality[]=4
```

#### Response

```json
200


{
  "id": 2886,
  "channel_id": "71f08fde-409d-420f-b1bf-0284e81c31fd",
  "status": "queued",
  "start_at": "2018-01-14T00:00:00+09:00",
  "end_at": "2018-01-14T00:25:00+09:00",
  "created_at": "2018-01-01T00:00:00+09:00",
  "updated_at": "2018-01-01T00:00:00+09:00",
  "evaluate": [
    {
      "user_id": 1417,
      "evaluate": {
        "fun": 4,
        "ability": 1,
        "time": 1,
        "quality": [

        ]
      }
    }
  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "memo": ""
    },
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "report": null
    },
    {
      "timestamp": "2018-01-14T00:00:00+09:00",
      "report": null
    }
  ],
  "statuses": [
    "Ontime",
    "Late"
  ],
  "accepting_requests": false,
  "users": [
    {
      "id": 1417,
      "username": "teacher 45",
      "name": "くぼた さちほ",
      "type": "Teacher",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": "まだ評価はありません",
      "rated_conversation_level": null,
      "country": "日本",
      "timezone": "Asia/Tokyo",
      "desired_condition": 2,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    },
    {
      "id": 1418,
      "username": "student 96",
      "name": "Mr. Willard",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を合格したことがない",
      "conversation_level": "幅広い話題の会話が可能",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "料理"
        },
        {
          "id": 2,
          "name": "読書"
        },
        {
          "id": 3,
          "name": "スポーツ"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "若い人との会話を楽しみたい"
        },
        {
          "id": 2,
          "name": "若い世代に貢献したい"
        },
        {
          "id": 3,
          "name": "仕事や日常の経験を伝えたい"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## GET /api/v1/conversations/calendar.json
Return calendar.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
year | integer | optional | Format<br>"%Y" | Default: Current Year<br>年を指定
month | integer | optional | Format<br>"%m" | Default: Current Month<br>月を指定



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/calendar.json?year=2018&month=1
Authorization: Bearer 1S5BAskRACLbdPFoz22soy3z
Host: www.example.com
```

#### Response

```json
200


{
  "1": {
    "is_enabled": false,
    "is_reserved": true
  },
  "2": {
    "is_enabled": false,
    "is_reserved": true
  },
  "3": {
    "is_enabled": false,
    "is_reserved": true
  },
  "4": {
    "is_enabled": true,
    "is_reserved": true
  },
  "5": {
    "is_enabled": true,
    "is_reserved": true
  },
  "6": {
    "is_enabled": true,
    "is_reserved": true
  },
  "7": {
    "is_enabled": true,
    "is_reserved": true
  },
  "8": {
    "is_enabled": true,
    "is_reserved": true
  },
  "9": {
    "is_enabled": true,
    "is_reserved": true
  },
  "10": {
    "is_enabled": true,
    "is_reserved": true
  },
  "11": {
    "is_enabled": false,
    "is_reserved": true
  },
  "12": {
    "is_enabled": true,
    "is_reserved": false
  },
  "13": {
    "is_enabled": true,
    "is_reserved": false
  },
  "14": {
    "is_enabled": true,
    "is_reserved": false
  },
  "15": {
    "is_enabled": true,
    "is_reserved": false
  },
  "16": {
    "is_enabled": true,
    "is_reserved": false
  },
  "17": {
    "is_enabled": true,
    "is_reserved": false
  },
  "18": {
    "is_enabled": true,
    "is_reserved": false
  },
  "19": {
    "is_enabled": true,
    "is_reserved": false
  },
  "20": {
    "is_enabled": true,
    "is_reserved": false
  },
  "21": {
    "is_enabled": false,
    "is_reserved": false
  },
  "22": {
    "is_enabled": true,
    "is_reserved": false
  },
  "23": {
    "is_enabled": true,
    "is_reserved": false
  },
  "24": {
    "is_enabled": true,
    "is_reserved": false
  },
  "25": {
    "is_enabled": true,
    "is_reserved": false
  },
  "26": {
    "is_enabled": true,
    "is_reserved": false
  },
  "27": {
    "is_enabled": true,
    "is_reserved": false
  },
  "28": {
    "is_enabled": true,
    "is_reserved": false
  },
  "29": {
    "is_enabled": true,
    "is_reserved": false
  },
  "30": {
    "is_enabled": true,
    "is_reserved": false
  },
  "31": {
    "is_enabled": false,
    "is_reserved": false
  }
}
```

## GET /api/v1/conversations/calendar.json
Return calendar.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
year | integer | optional | Format<br>"%Y" | Default: Current Year<br>年を指定
month | integer | optional | Format<br>"%m" | Default: Current Month<br>月を指定



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/calendar.json?year=2018&month=1
Authorization: Bearer y8JNgxbP1cT5sg2do8fxFxrm
Host: www.example.com
```

#### Response

```json
200


{
  "1": {
    "is_enabled": false,
    "is_reserved": false
  },
  "2": {
    "is_enabled": false,
    "is_reserved": false
  },
  "3": {
    "is_enabled": false,
    "is_reserved": false
  },
  "4": {
    "is_enabled": false,
    "is_reserved": false
  },
  "5": {
    "is_enabled": false,
    "is_reserved": false
  },
  "6": {
    "is_enabled": false,
    "is_reserved": false
  },
  "7": {
    "is_enabled": false,
    "is_reserved": false
  },
  "8": {
    "is_enabled": false,
    "is_reserved": false
  },
  "9": {
    "is_enabled": false,
    "is_reserved": false
  },
  "10": {
    "is_enabled": false,
    "is_reserved": false
  },
  "11": {
    "is_enabled": false,
    "is_reserved": false
  },
  "12": {
    "is_enabled": false,
    "is_reserved": false
  },
  "13": {
    "is_enabled": false,
    "is_reserved": false
  },
  "14": {
    "is_enabled": false,
    "is_reserved": false
  },
  "15": {
    "is_enabled": false,
    "is_reserved": false
  },
  "16": {
    "is_enabled": false,
    "is_reserved": false
  },
  "17": {
    "is_enabled": false,
    "is_reserved": false
  },
  "18": {
    "is_enabled": false,
    "is_reserved": false
  },
  "19": {
    "is_enabled": false,
    "is_reserved": false
  },
  "20": {
    "is_enabled": false,
    "is_reserved": false
  },
  "21": {
    "is_enabled": false,
    "is_reserved": false
  },
  "22": {
    "is_enabled": false,
    "is_reserved": false
  },
  "23": {
    "is_enabled": false,
    "is_reserved": false
  },
  "24": {
    "is_enabled": false,
    "is_reserved": false
  },
  "25": {
    "is_enabled": false,
    "is_reserved": false
  },
  "26": {
    "is_enabled": false,
    "is_reserved": false
  },
  "27": {
    "is_enabled": false,
    "is_reserved": false
  },
  "28": {
    "is_enabled": false,
    "is_reserved": false
  },
  "29": {
    "is_enabled": false,
    "is_reserved": false
  },
  "30": {
    "is_enabled": false,
    "is_reserved": false
  },
  "31": {
    "is_enabled": false,
    "is_reserved": false
  }
}
```

## GET /api/v1/conversations/recommend.json
Return conversations.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
date_on | date | optional | Format<br>"%Y/%m/%d"<br>"%Y.%m.%d"<br>"%Y-%m-%d" | Default: Today<br>指定日のおすすめのユーザーの一覧を取得する



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/recommend.json?date_on=2018-01-01
Authorization: Bearer NxSbimPQuGVN4pqmGKExxwg4
Host: www.example.com
```

#### Response

```json
200


[
  {
    "id": 3453,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T20:00:00+05:00",
    "end_at": "2018-01-01T20:25:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  },
  {
    "id": 3454,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T20:30:00+05:00",
    "end_at": "2018-01-01T20:55:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  },
  {
    "id": 3455,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T21:00:00+05:00",
    "end_at": "2018-01-01T21:25:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  },
  {
    "id": 3456,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T21:30:00+05:00",
    "end_at": "2018-01-01T21:55:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  },
  {
    "id": 3457,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T22:00:00+05:00",
    "end_at": "2018-01-01T22:25:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  },
  {
    "id": 3458,
    "channel_id": "63da0a56-61f8-4cba-b1ea-cea1c0fc2c9e",
    "status": "waiting",
    "start_at": "2018-01-01T22:30:00+05:00",
    "end_at": "2018-01-01T22:55:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-01T20:00:00+05:00",
        "memo": ""
      }
    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 1438,
        "username": "teacher 56",
        "name": "Saki Komori",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "available": true
  }
]
```

## POST /api/v1/conversations/reserve.json
Return conversation.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
id | integer | **required** |  | Default: null<br>予約を行う conversation.id を指定します



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations/reserve.json
Authorization: Bearer frxh4BWHDouZg7XCmdQioy46
Host: www.example.com

id=3694
```

#### Response

```json
200


{
  "id": 3100,
  "channel_id": "c0ee36a0-0d63-4131-a7ee-99a44c674277",
  "status": "queued",
  "start_at": "2018-02-01T01:30:00+05:00",
  "end_at": "2018-02-01T01:55:00+05:00",
  "created_at": "2017-12-31T20:00:00+05:00",
  "updated_at": "2017-12-31T20:00:00+05:00",
  "evaluate": [

  ],
  "with_self": true,
  "memos": [
    {
      "timestamp": "2018-02-01T01:30:00+05:00",
      "memo": ""
    },
    {
      "timestamp": "2018-02-01T01:30:00+05:00",
      "memo": ""
    }
  ],
  "reports": [
    {
      "timestamp": "2018-02-01T01:30:00+05:00",
      "report": null
    },
    {
      "timestamp": "2018-02-01T01:30:00+05:00",
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
      "id": 1470,
      "username": "teacher 72",
      "name": "Aori Ishii",
      "type": "Teacher",
      "sex": 1,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": 0,
      "rated_conversation_level": null,
      "country": "Japan",
      "timezone": "Asia/Tokyo",
      "desired_condition": 2,
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Cooking"
        },
        {
          "id": 2,
          "name": "Reading"
        },
        {
          "id": 3,
          "name": "Sports"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "To talk with young people"
        },
        {
          "id": 2,
          "name": "To contribute to the younger generation"
        },
        {
          "id": 3,
          "name": "To convey work and daily experiences"
        }
      ]
    },
    {
      "id": 1469,
      "username": "student 121",
      "name": "Veronica Feeney",
      "type": "Student",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": 1,
      "conversation_level": 4,
      "rated_conversation_level": null,
      "country": "Tajikistan",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Cooking"
        },
        {
          "id": 2,
          "name": "Reading"
        },
        {
          "id": 3,
          "name": "Sports"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "To talk with young people"
        },
        {
          "id": 2,
          "name": "To contribute to the younger generation"
        },
        {
          "id": 3,
          "name": "To convey work and daily experiences"
        }
      ]
    }
  ],
  "conversation_requests": [

  ],
  "available": false
}
```

## POST /api/v1/conversation_requests.json
Requests conversation to the exactly conversation as the current user, and returns the created request.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
reservable_conversation_id | integer | optional |  | リクエストを行う対象の会話のReservableConversation.idを指定します。



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversation_requests.json
Authorization: Bearer HUMiikEKYuCkys7H2aTtfDsa
Host: www.example.com

reservable_conversation_id=3749
```

#### Response

```json
201


{
  "id": 46,
  "conversation": {
    "id": 3144,
    "channel_id": "5b4ea1e9-6f4c-45ac-b6ec-18d06dd5847e",
    "status": "waiting",
    "start_at": "2018-01-31T20:00:00+05:00",
    "end_at": "2018-02-01T02:00:00+05:00",
    "created_at": "2017-12-31T20:00:00+05:00",
    "updated_at": "2017-12-31T20:00:00+05:00",
    "evaluate": [

    ],
    "with_self": false,
    "memos": [
      {
        "timestamp": "2018-01-31T20:00:00+05:00",
        "memo": ""
      }
    ],
    "reports": [
      {
        "timestamp": "2018-01-31T20:00:00+05:00",
        "report": null
      }
    ],
    "statuses": [
      "Absent",
      "Absent"
    ],
    "accepting_requests": true,
    "users": [
      {
        "id": 1483,
        "username": "teacher 79",
        "name": "Satoe Matsuo",
        "type": "Teacher",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": null,
        "conversation_level": 0,
        "rated_conversation_level": null,
        "country": "Japan",
        "timezone": "Asia/Tokyo",
        "desired_condition": 2,
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

        ],
        "hobbies": [
          {
            "id": 1,
            "name": "Cooking"
          },
          {
            "id": 2,
            "name": "Reading"
          },
          {
            "id": 3,
            "name": "Sports"
          }
        ],
        "purposes": [
          {
            "id": 1,
            "name": "To talk with young people"
          },
          {
            "id": 2,
            "name": "To contribute to the younger generation"
          },
          {
            "id": 3,
            "name": "To convey work and daily experiences"
          }
        ]
      }
    ],
    "conversation_requests": [
      {
        "id": 46,
        "user": {
          "id": 1484,
          "username": "student 128",
          "name": "Miss Joe",
          "type": "Student",
          "sex": 9,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": -1,
          "conversation_level": 4,
          "rated_conversation_level": null,
          "country": "Tajikistan",
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

          ],
          "hobbies": [
            {
              "id": 1,
              "name": "Cooking"
            },
            {
              "id": 2,
              "name": "Reading"
            },
            {
              "id": 3,
              "name": "Sports"
            }
          ],
          "purposes": [
            {
              "id": 1,
              "name": "To talk with young people"
            },
            {
              "id": 2,
              "name": "To contribute to the younger generation"
            },
            {
              "id": 3,
              "name": "To convey work and daily experiences"
            }
          ]
        },
        "start_at": "2018-01-31T20:00:00+05:00",
        "end_at": "2018-01-31T20:25:00+05:00"
      }
    ],
    "available": false
  },
  "user": {
    "id": 1484,
    "username": "student 128",
    "name": "Miss Joe",
    "type": "Student",
    "sex": 9,
    "picture_url": "/assets/img/common/user@3x.png",
    "level": -1,
    "conversation_level": 4,
    "rated_conversation_level": null,
    "country": "Tajikistan",
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

    ],
    "hobbies": [
      {
        "id": 1,
        "name": "Cooking"
      },
      {
        "id": 2,
        "name": "Reading"
      },
      {
        "id": 3,
        "name": "Sports"
      }
    ],
    "purposes": [
      {
        "id": 1,
        "name": "To talk with young people"
      },
      {
        "id": 2,
        "name": "To contribute to the younger generation"
      },
      {
        "id": 3,
        "name": "To convey work and daily experiences"
      }
    ]
  },
  "start_at": "2018-01-31T20:00:00+05:00",
  "end_at": "2018-01-31T20:25:00+05:00"
}
```

## DELETE /api/v1/conversation_requests.json
Cancels the conversation request made by the current user, and returns nothing.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
DELETE /api/v1/conversation_requests/3166.json
Authorization: Bearer 1WydKVcFXHCLBYpt9rK3GYqM
Host: www.example.com
```

#### Response

```json
204

```

## POST /api/v1/conversations/:id/report.json
データベースに報告の種類と文章を記録し、相手をブロックします。.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
report_reasons | array | **required** |  | 報告理由を教えてください<br>1: 他サービスへの勧誘行為, 2: スパム・宣伝目的, 3: 出会い・わいせつ目的, 4: 犯罪・違法行為, 5: その他、迷惑行為
report_detail | string | **required** |  | よろしければ詳細を教えてください (自由文)
request_block | integer | optional | Only<br>[0, 1] | このユーザーをブロックする<br>1: ブロックする, 2: ブロックしない



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations/3177/report.json
Authorization: Bearer 88Ufb3MLEQeHZ9S5dNEwuS8m
Host: www.example.com

report_reasons[]=1&report_reasons[]=3&report_detail=%E5%95%8F%E9%A1%8C%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F&request_block=1
```

#### Response

```json
201


{
  "report_reasons": [

  ],
  "report_detail": "問題がありました"
}
```

## PATCH /api/v1/conversations/:id/report.json
Updates conversation report for the current user, and returns the updated report object.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
report_reasons | array | **required** |  | 報告理由を教えてください<br>1: 他サービスへの勧誘行為, 2: スパム・宣伝目的, 3: 出会い・わいせつ目的, 4: 犯罪・違法行為, 5: その他、迷惑行為
report_detail | string | **required** |  | よろしければ詳細を教えてください (自由文)
request_block | integer | optional | Only<br>[0, 1] | このユーザーをブロックする<br>1: ブロックする, 2: ブロックしない



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/conversations/3221/report.json
Authorization: Bearer pB9fwJWNWvMzZkZNPGYxp1Xw
Host: www.example.com

report_reasons[]=1&report_reasons[]=3&report_reasons[]=4&report_detail=%E6%9B%B4%E6%96%B0%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%E5%95%8F%E9%A1%8C%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F&request_block=1
```

#### Response

```json
200


{
  "report_reasons": [

  ],
  "report_detail": "更新しました。問題がありました"
}
```

## POST /api/v1/conversations/:id/memo.json
Creates conversation memo, and returns the created memo object.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
memo | string | **required** |  | メモの本文 (自由文)



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/conversations/3243/memo.json
Authorization: Bearer oDkQP1gVjQp6nZPBNKRUHrDh
Host: www.example.com

memo=%E4%BB%8A%E6%97%A5%E3%81%AE%E4%BC%9A%E8%A9%B1%E3%81%AF%E9%9D%9E%E5%B8%B8%E3%81%AB%E6%A5%BD%E3%81%97%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%A7%E3%80%81%E6%AC%A1%E5%9B%9E%E3%82%82%E3%81%93%E3%81%AE%E4%BA%BA%E3%81%A0%E3%81%A8%E5%AC%89%E3%81%97%E3%81%84%E3%80%82
```

#### Response

```json
201


{
  "timestamp": "2018-01-14T00:00:00+09:00",
  "memo": "今日の会話は非常に楽しかったので、次回もこの人だと嬉しい。"
}
```

## PATCH /api/v1/conversations/:id/memo.json
Updates conversation memo, and returns the created memo object.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
memo | string | **required** |  | メモの本文 (自由文)



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/conversations/3265/memo.json
Authorization: Bearer 3jpTvvvfAEKM5X1DpHgnR1F7
Host: www.example.com

memo=%E6%9B%B4%E6%96%B0%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F%E3%80%82%E4%BB%8A%E6%97%A5%E3%81%AE%E4%BC%9A%E8%A9%B1%E3%81%AF%E9%9D%9E%E5%B8%B8%E3%81%AB%E6%A5%BD%E3%81%97%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%A7%E3%80%81%E6%AC%A1%E5%9B%9E%E3%82%82%E3%81%93%E3%81%AE%E4%BA%BA%E3%81%A0%E3%81%A8%E5%AC%89%E3%81%97%E3%81%84%E3%80%82
```

#### Response

```json
201


{
  "timestamp": "2018-01-14T00:00:00+09:00",
  "memo": "更新してみた。今日の会話は非常に楽しかったので、次回もこの人だと嬉しい。"
}
```

## GET /api/v1/conversations/recommend/:id.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/recommend/3925.json
Authorization: Bearer jGBmhVuS5HN8iVWGVAZyNPbv
Host: www.example.com
```

#### Response

```json
200


{
  "id": 3925,
  "channel_id": "3fa349d2-b8e3-4383-8932-ad39f4c123bd",
  "status": "waiting",
  "start_at": "2018-01-01T20:00:00+05:00",
  "end_at": "2018-01-01T20:25:00+05:00",
  "created_at": "2017-12-31T20:00:00+05:00",
  "updated_at": "2017-12-31T20:00:00+05:00",
  "evaluate": [

  ],
  "with_self": false,
  "memos": [
    {
      "timestamp": "2018-01-01T20:00:00+05:00",
      "memo": ""
    }
  ],
  "accepting_requests": false,
  "users": [
    {
      "id": 1512,
      "username": "teacher 93",
      "name": "Gaku Tomita",
      "type": "Teacher",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": 0,
      "rated_conversation_level": null,
      "country": "Japan",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Cooking"
        },
        {
          "id": 2,
          "name": "Reading"
        },
        {
          "id": 3,
          "name": "Sports"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "To talk with young people"
        },
        {
          "id": 2,
          "name": "To contribute to the younger generation"
        },
        {
          "id": 3,
          "name": "To convey work and daily experiences"
        }
      ]
    }
  ],
  "available": true
}
```

## GET /api/v1/conversations/cancelled/:id.json
キャンセルされた会話データは、`channel_id`が空文字、`evaluate`が`nil`、`memos`が空リストになります。.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversations/cancelled/3309.json
Authorization: Bearer XRXK8hHm4P9EX3PnrQYruWbQ
Host: www.example.com
```

#### Response

```json
200


{
  "id": 8,
  "channel_id": "",
  "status": "cancled",
  "start_at": "2018-01-01T20:00:00+05:00",
  "end_at": "2018-01-01T20:25:00+05:00",
  "created_at": "2017-12-31T20:00:00+05:00",
  "updated_at": "2017-12-31T20:00:00+05:00",
  "evaluate": null,
  "with_self": true,
  "memos": [

  ],
  "statuses": [

  ],
  "accepting_requests": false,
  "users": [
    {
      "id": 1519,
      "username": "teacher 97",
      "name": "Manami Nozaki",
      "type": "Teacher",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": null,
      "conversation_level": 0,
      "rated_conversation_level": null,
      "country": "Japan",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Cooking"
        },
        {
          "id": 2,
          "name": "Reading"
        },
        {
          "id": 3,
          "name": "Sports"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "To talk with young people"
        },
        {
          "id": 2,
          "name": "To contribute to the younger generation"
        },
        {
          "id": 3,
          "name": "To convey work and daily experiences"
        }
      ]
    },
    {
      "id": 1520,
      "username": "student 146",
      "name": "Dorothea Fisher",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": 2,
      "conversation_level": 5,
      "rated_conversation_level": null,
      "country": "Tajikistan",
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

      ],
      "hobbies": [
        {
          "id": 1,
          "name": "Cooking"
        },
        {
          "id": 2,
          "name": "Reading"
        },
        {
          "id": 3,
          "name": "Sports"
        }
      ],
      "purposes": [
        {
          "id": 1,
          "name": "To talk with young people"
        },
        {
          "id": 2,
          "name": "To contribute to the younger generation"
        },
        {
          "id": 3,
          "name": "To convey work and daily experiences"
        }
      ]
    }
  ]
}
```
