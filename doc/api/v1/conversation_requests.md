## GET /api/v1/conversation_requests.json
Requests the current user's conversation requests, and returns those all.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/conversation_requests.json
Authorization: Bearer KtjQK3nwz9y6Xt6igKRKiJHW
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 28,
      "conversation": {
        "id": 1715,
        "channel_id": "cd0c852f-d392-4dbe-8aae-098550542044",
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
        "reports": [
          {
            "timestamp": "2018-01-01T20:00:00+05:00",
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
            "id": 1076,
            "username": "teacher 7",
            "name": "Yukayo Takeshita",
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
          }
        ],
        "conversation_requests": [
          {
            "id": 28,
            "user": {
              "id": 1077,
              "username": "student 62",
              "name": "Helene Botsford",
              "type": "Student",
              "sex": 9,
              "picture_url": "/assets/img/common/user@3x.png",
              "level": 5,
              "conversation_level": 2,
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
            "start_at": "2018-01-01T20:00:00+05:00",
            "end_at": "2018-01-01T20:25:00+05:00"
          }
        ],
        "available": false
      },
      "user": {
        "id": 1077,
        "username": "student 62",
        "name": "Helene Botsford",
        "type": "Student",
        "sex": 9,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": 5,
        "conversation_level": 2,
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
      "start_at": "2018-01-01T20:00:00+05:00",
      "end_at": "2018-01-01T20:25:00+05:00"
    },
    {
      "id": 29,
      "conversation": {
        "id": 1716,
        "channel_id": "9a2dd186-ee00-4c31-a0b8-31bd798f4006",
        "status": "waiting",
        "start_at": "2018-01-02T20:00:00+05:00",
        "end_at": "2018-01-02T20:25:00+05:00",
        "created_at": "2017-12-31T20:00:00+05:00",
        "updated_at": "2017-12-31T20:00:00+05:00",
        "evaluate": [

        ],
        "with_self": false,
        "memos": [
          {
            "timestamp": "2018-01-02T20:00:00+05:00",
            "memo": ""
          }
        ],
        "reports": [
          {
            "timestamp": "2018-01-02T20:00:00+05:00",
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
            "id": 1076,
            "username": "teacher 7",
            "name": "Yukayo Takeshita",
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
          }
        ],
        "conversation_requests": [
          {
            "id": 29,
            "user": {
              "id": 1077,
              "username": "student 62",
              "name": "Helene Botsford",
              "type": "Student",
              "sex": 9,
              "picture_url": "/assets/img/common/user@3x.png",
              "level": 5,
              "conversation_level": 2,
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
            "start_at": "2018-01-02T20:00:00+05:00",
            "end_at": "2018-01-02T20:25:00+05:00"
          }
        ],
        "available": false
      },
      "user": {
        "id": 1077,
        "username": "student 62",
        "name": "Helene Botsford",
        "type": "Student",
        "sex": 9,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": 5,
        "conversation_level": 2,
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
      "start_at": "2018-01-02T20:00:00+05:00",
      "end_at": "2018-01-02T20:25:00+05:00"
    },
    {
      "id": 30,
      "conversation": {
        "id": 1717,
        "channel_id": "ae3501c8-d41c-4601-9b69-fc826ff1aca1",
        "status": "waiting",
        "start_at": "2018-01-03T20:00:00+05:00",
        "end_at": "2018-01-03T20:25:00+05:00",
        "created_at": "2017-12-31T20:00:00+05:00",
        "updated_at": "2017-12-31T20:00:00+05:00",
        "evaluate": [

        ],
        "with_self": false,
        "memos": [
          {
            "timestamp": "2018-01-03T20:00:00+05:00",
            "memo": ""
          }
        ],
        "reports": [
          {
            "timestamp": "2018-01-03T20:00:00+05:00",
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
            "id": 1076,
            "username": "teacher 7",
            "name": "Yukayo Takeshita",
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
          }
        ],
        "conversation_requests": [
          {
            "id": 30,
            "user": {
              "id": 1077,
              "username": "student 62",
              "name": "Helene Botsford",
              "type": "Student",
              "sex": 9,
              "picture_url": "/assets/img/common/user@3x.png",
              "level": 5,
              "conversation_level": 2,
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
            "start_at": "2018-01-03T20:00:00+05:00",
            "end_at": "2018-01-03T20:25:00+05:00"
          }
        ],
        "available": false
      },
      "user": {
        "id": 1077,
        "username": "student 62",
        "name": "Helene Botsford",
        "type": "Student",
        "sex": 9,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": 5,
        "conversation_level": 2,
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
      "start_at": "2018-01-03T20:00:00+05:00",
      "end_at": "2018-01-03T20:25:00+05:00"
    }
  ]
}
```

## PATCH /api/v1/conversation_requests/:id.json
Requests the current user's conversation requests, and returns those all.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/conversation_requests/34.json
Authorization: Bearer wJhn9snFChxaYmzjc5WzimUK
Host: www.example.com
```

#### Response

```json
200


{
  "id": 34,
  "conversation": {
    "id": 1721,
    "channel_id": "b55508bd-8321-4f4a-85c8-04f60c2cc4ab",
    "status": "queued",
    "start_at": "2018-01-12T00:00:00+09:00",
    "end_at": "2018-01-12T00:25:00+09:00",
    "created_at": "2018-01-01T00:00:00+09:00",
    "updated_at": "2018-01-01T00:00:00+09:00",
    "evaluate": [

    ],
    "with_self": true,
    "memos": [
      {
        "timestamp": "2018-01-12T00:00:00+09:00",
        "memo": ""
      },
      {
        "timestamp": "2018-01-12T00:00:00+09:00",
        "memo": ""
      }
    ],
    "reports": [
      {
        "timestamp": "2018-01-12T00:00:00+09:00",
        "report": null
      },
      {
        "timestamp": "2018-01-12T00:00:00+09:00",
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
        "id": 1080,
        "username": "teacher 9",
        "name": "おちあい かなえ",
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
        "id": 1081,
        "username": "student 64",
        "name": "Evelyn Schulist",
        "type": "Student",
        "sex": 1,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": "日常的な会話に加えて、複雑な日本語での会話が少しできる",
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
      {
        "id": 34,
        "user": {
          "id": 1081,
          "username": "student 64",
          "name": "Evelyn Schulist",
          "type": "Student",
          "sex": 1,
          "picture_url": "/assets/img/common/user@3x.png",
          "level": "日常的な会話に加えて、複雑な日本語での会話が少しできる",
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
        },
        "start_at": "2018-01-12T00:00:00+09:00",
        "end_at": "2018-01-12T00:25:00+09:00"
      }
    ],
    "available": false
  },
  "user": {
    "id": 1081,
    "username": "student 64",
    "name": "Evelyn Schulist",
    "type": "Student",
    "sex": 1,
    "picture_url": "/assets/img/common/user@3x.png",
    "level": "日常的な会話に加えて、複雑な日本語での会話が少しできる",
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
  },
  "start_at": "2018-01-12T00:00:00+09:00",
  "end_at": "2018-01-12T00:25:00+09:00"
}
```
