## POST /api/v1/teachers/signin.json
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
POST /api/v1/teachers/signin.json
Host: www.example.com

email=teacher%2B140%40example.com&password=password
```

#### Response

```json
200


{
  "email": "teacher+140@example.com",
  "birthday": "1965-06-17",
  "auth_token": "dPVbTg5zsW2fHQnSUp6Xy8mS",
  "web_socket_token": "r91Po5qmgH1LxBat8Mc4zS3d",
  "id": 1666,
  "username": "teacher 136",
  "name": "たけむら すずこ",
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

## DELETE /api/v1/teachers/signout.json
Success.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
DELETE /api/v1/teachers/signout.json
Authorization: Bearer S381PdFX3pPTmM6LkUtnTb27
Host: www.example.com
```

#### Response

```json
204

```
