## GET /api/v1/accusations/reasons.json
Returns all reasons.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/accusations/reasons.json
Authorization: Bearer nVF9iLyezvWv6Jm6zjGwoYjU
Host: www.example.com
```

#### Response

```json
200


[
  {
    "id": 1,
    "name": "他サービスへの勧誘行為"
  },
  {
    "id": 2,
    "name": "スパム・宣伝目的"
  },
  {
    "id": 3,
    "name": "出会い・わいせつ目的"
  },
  {
    "id": 4,
    "name": "犯罪・違法行為"
  },
  {
    "id": 5,
    "name": "その他、迷惑行為"
  }
]
```

## POST /api/v1/accusations.json
Returns all reasons.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
conversation_id | integer | **required** |  | conversation.id
user_id | integer | **required** |  | 対象ユーザーの user.id
accusation_reason_id | integer | **required** | Only<br>[1, 2, 3, 4, 5] | 通報理由<br>1: 他サービスへの勧誘行為, 2: スパム・宣伝目的, 3: 出会い・わいせつ目的, 4: 犯罪・違法行為, 5: その他、迷惑行為



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/accusations.json
Authorization: Bearer YdKGAtspDb8fMaLMTKofJLGW
Host: www.example.com

conversation_id=6322&user_id=2555&accusation_reason_id=5
```

#### Response

```json
201


{
  "conversation": {
    "id": 6322,
    "channel_id": "0054aeb0-0652-472f-b88c-fe1c4e92e256",
    "status": "cancled",
    "start_at": "2019-06-19T13:50:46+05:00",
    "end_at": "2019-06-19T14:15:46+05:00",
    "created_at": "2019-06-19T13:50:46+05:00",
    "updated_at": "2019-06-19T13:50:46+05:00",
    "evaluate": [

    ],
    "with_self": true,
    "memos": [

    ],
    "accepting_requests": false,
    "users": [
      {
        "id": 2555,
        "username": "teacher 3",
        "name": "Rikuto Nagano",
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
        "conversations": [

        ],
        "hobbies": [

        ],
        "purposes": [

        ]
      },
      {
        "id": 2554,
        "username": "student 3",
        "name": "Lavada Senger",
        "type": "Student",
        "sex": 2,
        "picture_url": "/assets/img/common/user@3x.png",
        "level": 2,
        "conversation_level": 3,
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
        "conversations": [

        ],
        "hobbies": [

        ],
        "purposes": [

        ]
      }
    ]
  },
  "from_user": {
    "id": 2554,
    "username": "student 3",
    "name": "Lavada Senger",
    "type": "Student",
    "sex": 2,
    "picture_url": "/assets/img/common/user@3x.png",
    "level": 2,
    "conversation_level": 3,
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
    "conversations": [

    ],
    "hobbies": [

    ],
    "purposes": [

    ],
    "organizations": [

    ],
    "organization_sections": [

    ]
  },
  "to_user": {
    "id": 2555,
    "username": "teacher 3",
    "name": "Rikuto Nagano",
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
    "conversations": [

    ],
    "hobbies": [

    ],
    "purposes": [

    ],
    "organizations": [

    ],
    "organization_sections": [

    ]
  },
  "accusation_reason": {
    "attributes": {
      "id": 5,
      "name_ja": "その他、迷惑行為",
      "name_en": "Other harassment"
    }
  }
}
```
