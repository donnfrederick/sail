## GET /api/v1/blocks.json
Returns some blocks.


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
GET /api/v1/blocks.json
Authorization: Bearer YgNd2GCaKXprYkibPznndSLN
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 1017,
      "username": "student 8",
      "name": "Coy Rau",
      "type": "Student",
      "sex": 9,
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1018,
      "username": "student 9",
      "name": "Joy Koss",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "基本的な日本語での会話が少しできる",
      "conversation_level": "いくつかの単語を言える",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1019,
      "username": "student 10",
      "name": "Brandyn Kilback",
      "type": "Student",
      "sex": 1,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を受験したことがない",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1020,
      "username": "student 11",
      "name": "Jaquan Bernhard",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "複雑な日本語での会話ができる",
      "conversation_level": "いくつかの単語を言える",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1021,
      "username": "student 12",
      "name": "Mr. Carson",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "複雑な日本語での会話ができる",
      "conversation_level": "いくつかの単語を言える",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1022,
      "username": "student 13",
      "name": "Maryjane Schimmel",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1023,
      "username": "student 14",
      "name": "Anahi Effertz",
      "type": "Student",
      "sex": 1,
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1024,
      "username": "student 15",
      "name": "Mr. Boyd",
      "type": "Student",
      "sex": 2,
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1025,
      "username": "student 16",
      "name": "Nash Dooley",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "基本的な日本語での会話が少しできる",
      "conversation_level": "まだ評価はありません",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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
    {
      "id": 1026,
      "username": "student 17",
      "name": "Madisyn Roberts",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を受験したことがない",
      "conversation_level": "いくつかの単語を言える",
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
      "is_blocked": true,
      "payment_state": "free",
      "grade": "member",
      "highly_reliable": false,
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

## POST /api/v1/blocks.json
Returns block resource.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
user_id | integer | **required** |  | 対象ユーザーの user.id



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
POST /api/v1/blocks.json
Authorization: Bearer 3diLXekK18z3YLov2NZxWSNu
Host: www.example.com

user_id=1073
```

#### Response

```json
201


{
  "id": 1073,
  "username": "student 60",
  "name": "Orlando Nolan",
  "type": "Student",
  "sex": 2,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": "複雑な日本語での会話ができる",
  "conversation_level": "まだ評価はありません",
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

  ],
  "purposes": [

  ],
  "organizations": [

  ],
  "organization_sections": [

  ]
}
```

## DELETE /api/v1/blocks.json
Returns block resource.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
user_id | integer | **required** |  | 対象ユーザーの user.id



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
DELETE /api/v1/blocks.json
Authorization: Bearer TKQHnjLwTagLhNP5tbpBdNBJ
Host: www.example.com

user_id=1075
```

#### Response

```json
200


{
  "id": 1075,
  "username": "student 61",
  "name": "Nadia Blanda",
  "type": "Student",
  "sex": 9,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": "基本的な日本語での会話ができる",
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
  "is_blocked": true,
  "payment_state": "free",
  "grade": "member",
  "highly_reliable": false,
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
}
```
