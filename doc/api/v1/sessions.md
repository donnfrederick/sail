## POST /api/v1/signin.json
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
POST /api/v1/signin.json
Host: www.example.com

email=teacher%2B133%40example.com&password=password
```

#### Response

```json
200


{
  "email": "teacher+133@example.com",
  "birthday": "1957-11-09",
  "auth_token": "Ncngsjk6MT4NL1u7P8YxkMie",
  "web_socket_token": "HJNf1KkNv9XxGJAWn2brR2np",
  "id": 385,
  "username": "teacher 129",
  "name": "くりはら ゆきえ",
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
  "unread_count": 0,
  "conversations": [

  ],
  "absence": 0,
  "is_favorite": false,
  "is_blocked": false,
  "highly_reliable": false,
  "hobbies": [

  ],
  "purposes": [

  ]
}
```

## DELETE /api/v1/signout.json
Success.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
DELETE /api/v1/signout.json
Authorization: Bearer WV88EVak4UCMWv9AE5PLmzh6
Host: www.example.com
```

#### Response

```json
204
Set-Cookie: _sail_session=ure7b0sS8IDLkoVFr59RjJ6iCDDMQDx8QW%2FHG2Ch1cU7U14o83A%2BqS3CMeMWDxwl08ladu9%2BiAwflFRKhMU%2B--xt3A%2F64sxBTICXmd--Z0gbB%2FTDjsfZhAorre4PJw%3D%3D; path=/; HttpOnly
```
