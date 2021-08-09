## POST /api/v1/students/signin.json
Signin user.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス（または、ユーザー名）
password | string | **required** |  | パスワード
fcm_token | string | optional |  | 




### Example

#### Request

```
POST /api/v1/students/signin.json
Host: www.example.com

email=student%2B211%40example.com&password=password
```

#### Response

```json
200


{
  "email": "student+211@example.com",
  "birthday": "1980-06-07",
  "auth_token": "8f8P46FWBahE63yHyB4ifZdi",
  "web_socket_token": "wqwiiEhxbmHX43gDu7yDybhG",
  "id": 1612,
  "username": "student 207",
  "name": "Asia Cruickshank",
  "type": "Student",
  "sex": 9,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": 3,
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
  "unread_count": 0,
  "conversations": [

  ],
  "absence": 0,
  "is_favorite": false,
  "is_blocked": false,
  "grade": "member",
  "highly_reliable": false,
  "hobbies": [

  ],
  "purposes": [

  ]
}
```

## DELETE /api/v1/students/signout.json
Success.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
DELETE /api/v1/students/signout.json
Authorization: Bearer AG9AE9rvV6dcUmHhXaUXuRHC
Host: www.example.com
```

#### Response

```json
204

```
