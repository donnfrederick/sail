## GET /api/v1/favorites.json
Requests existing favorite users, and returns some of the users.


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
GET /api/v1/favorites.json
Authorization: Bearer yDNqfSFwmbfweTGzPvR343fC
Host: www.example.com
```

#### Response

```json
200


{
  "data": [
    {
      "id": 1526,
      "username": "student 149",
      "name": "Granville Connelly",
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
      "is_favorite": true,
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
    },
    {
      "id": 1527,
      "username": "student 150",
      "name": "Luz Krajcik",
      "type": "Student",
      "sex": 1,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "複雑な日本語での会話ができる",
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
      "is_favorite": true,
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
    },
    {
      "id": 1528,
      "username": "student 151",
      "name": "Brionna Treutel",
      "type": "Student",
      "sex": 1,
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
      "is_favorite": true,
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
    },
    {
      "id": 1529,
      "username": "student 152",
      "name": "Clint McGlynn",
      "type": "Student",
      "sex": 1,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を受験したことがない",
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
      "is_favorite": true,
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
    },
    {
      "id": 1530,
      "username": "student 153",
      "name": "Marlee Murazik",
      "type": "Student",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日常的な会話に加えて、複雑な日本語での会話が少しできる",
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
      "is_favorite": true,
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
    },
    {
      "id": 1531,
      "username": "student 154",
      "name": "Jared Fahey",
      "type": "Student",
      "sex": 2,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日常的な会話が少しできる",
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
      "is_favorite": true,
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
    },
    {
      "id": 1532,
      "username": "student 155",
      "name": "Karlie Kunde",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "日本語能力試験を合格したことがない",
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
      "is_favorite": true,
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
    },
    {
      "id": 1533,
      "username": "student 156",
      "name": "Brisa Lang",
      "type": "Student",
      "sex": 1,
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
      "is_favorite": true,
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
    },
    {
      "id": 1534,
      "username": "student 157",
      "name": "Vernice Quitzon",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "複雑な日本語での会話ができる",
      "conversation_level": "簡単なセンテンスが話せる",
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
      "is_favorite": true,
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
    },
    {
      "id": 1535,
      "username": "student 158",
      "name": "Clemens Ziemann",
      "type": "Student",
      "sex": 9,
      "picture_url": "/assets/img/common/user@3x.png",
      "level": "複雑な日本語での会話ができる",
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
      "is_favorite": true,
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

## POST /api/v1/favorites.json
Registers the given user as the current user's favorite, and returns the user object.


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
POST /api/v1/favorites.json
Authorization: Bearer AZYP75XjUw2DZFisSPXx16XU
Host: www.example.com

user_id=1582
```

#### Response

```json
201


{
  "id": 1582,
  "username": "student 201",
  "name": "Miguel Zieme",
  "type": "Student",
  "sex": 1,
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

## DELETE /api/v1/favorites.json
Unregisted the given user from the current user's favorite list, and returns the user object.


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
DELETE /api/v1/favorites.json
Authorization: Bearer ZLSrPX6oPheEW7vLz3MtD2YS
Host: www.example.com

user_id=1584
```

#### Response

```json
200


{
  "id": 1584,
  "username": "student 202",
  "name": "Gennaro Ritchie",
  "type": "Student",
  "sex": 2,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": "日常的な会話が少しできる",
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
  "is_favorite": true,
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
