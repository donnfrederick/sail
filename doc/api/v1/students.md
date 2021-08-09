## POST /api/v1/students.json
Renders resource created (`rated_conversation_level`が`nil`のときは未評価を意味します).


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス
password | string | **required** |  | パスワード
password_confirmation | string | optional |  | パスワード（確認）
name | string | **required** |  | 名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
picture | any | **required** |  | multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)
conversation_level | integer | **required** |  | 日本語会話レベル
level | integer | **required** |  | JLPT(日本語能力試験)のレベル
country | string | **required** |  | 国コード/国名のリストは別途API経由で取得
timezone | string | **required** |  | TimeZoneのリストは別途API経由で取得
hobbies | array | **required** |  | 最大3つまで<br>1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会
purposes | array | **required** |  | 最大3つまで<br>1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい
fcm_token | string | optional |  | 
phone_number | string | optional |  | 国際番号を除く有効な電話番号を指定 (ハイフン含んでもよい)




### Example

#### Request

```
POST /api/v1/students.json
Host: www.example.com

{
  "email": "test-user@example.com",
  "password": "password",
  "password_confirmation": "password",
  "name": "Mackenzie Hauck",
  "sex": 1,
  "level": 2,
  "conversation_level": 4,
  "country": "TJ",
  "timezone": "Asia/Dushanbe",
  "picture": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAACC2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KD0UqkwAAARxJREFUGBklkFtLQlEQhb85l9ISKrXASKHCHqKXoIT+X3+wJwsKewgkj2bi3aNOa+eGYQ/DzDdrlsXPLTc3iBVpAvsx/vWLNcqQr2GzBYfECilcV7GCmkZz/DDF1hvs8gSWOf45VF4h8f4US0QJk+EF8s8M/+jDLP8Pf89IorsaXi5CO8Oa1d0qbWCyhGwKrTr+1hMxTA9moqjY3RNhBQf6R4td/prBfE0U3Z9jMUTNU2kpY6Jb4wgrJvqPsTTGHusk2/b3TtNYpHGgSNdiA72JHEhxd0z6E8Y5dluDkoovXezmDE8jrCLdEVhnGLxR42CKK9FZ0rLCOwP5qVwWBRrjJaYtkTUr2JW06QB7uJBVhoWVwd+iak8NvFriDwzddzW02zd0AAAAAElFTkSuQmCC",
  "hobbies": [
    1,
    2,
    3
  ],
  "purposes": [
    1,
    2,
    3
  ],
  "desired_condition": 1
}
```

#### Response

```json
201


{
  "email": "test-user@example.com",
  "birthday": null,
  "auth_token": "qMj9nHW4VAmZmZEJW9DnWukQ",
  "web_socket_token": "a84r6EfKDinwNvSXxwyijnXu",
  "id": 1622,
  "username": "df2c748d-948f-4ab6-a3dc-80acb658ea9b",
  "name": "Mackenzie Hauck",
  "type": "Student",
  "sex": 1,
  "picture_url": "/uploads/student/picture/1622/25bce202-47ef-4757-95cd-9f1af085b02c.jpeg",
  "level": 2,
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
  "unread_count": 0,
  "conversations": [

  ],
  "absence": 0,
  "is_favorite": false,
  "is_blocked": false,
  "grade": "member",
  "highly_reliable": false,
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
```

## GET /api/v1/students/me.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/students/me.json
Authorization: Bearer MKftCr72NVXj9mMtgxrRVRng
Host: www.example.com
```

#### Response

```json
200


{
  "email": "student+221@example.com",
  "birthday": "1998-04-06",
  "auth_token": "MKftCr72NVXj9mMtgxrRVRng",
  "web_socket_token": "3saDerKv5oiKGJUFGkzRsXQa",
  "id": 1630,
  "username": "student 217",
  "name": "Zakary Hane",
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
  "unread_count": 0,
  "conversations": [

  ],
  "absence": 0,
  "is_favorite": false,
  "is_blocked": false,
  "grade": "member",
  "highly_reliable": false,
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
```

## GET /api/v1/students/:id.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/students/1632.json
Authorization: Bearer vzVZqJG6keQ68cgTDQgpp8hE
Host: www.example.com
```

#### Response

```json
200


{
  "id": 1632,
  "username": "student 219",
  "name": "Miss Madelynn",
  "type": "Student",
  "sex": 9,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": 1,
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
  ],
  "organizations": [

  ],
  "organization_sections": [

  ]
}
```

## GET /api/v1/students/:id/evaluations.json
アクセスユーザーとこの学生ユーザーが行った会話のみの、未評価会話データ、メモデータ、報告データを取得します。なお、ブロック中の場合は履歴に表示されません。`memos`は`[{timestamp: string, memo: string},...]`として、、`reports`は`[{timestamp: string, report: string},...]`として、`unrated_conversation`は`[{timestamp: string, id: integer},...]`として返します。このとき、`unrated_conversation`の`id`は`conversation.id`を指します。.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/students/1636/evaluations.json
Authorization: Bearer xrf26zWT541Q82JVcyQ5hH8K
Host: www.example.com
```

#### Response

```json
200


{
  "unrated_conversations": [

  ],
  "memos": [

  ],
  "reports": [

  ]
}
```

## PATCH /api/v1/students/me.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | optional |  | メールアドレス
current_password | string | optional |  | 現在のパスワード
password | string | optional |  | 新しいパスワード
password_confirmation | string | optional |  | 新しいパスワード（確認）
name | string | optional |  | 名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
picture | any | optional |  | multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)
conversation_level | integer | optional |  | 日本語会話レベル
level | integer | optional |  | JLPT(日本語能力試験)のレベル
country | string | optional |  | 国コード/国名のリストは別途API経由で取得
timezone | string | optional |  | TimeZoneのリストは別途API経由で取得
hobbies | array | optional |  | 最大3つまで<br> 1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会
purposes | array | optional |  | 最大3つまで<br>1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい
fcm_token | string | optional |  | 



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/students/me.json
Authorization: Bearer 3ZUKpM3CudFSmTrk8ncC5Rh9
Host: www.example.com

name=Miss+Johann+Gerlach
```

#### Response

```json
200


{
  "email": "student+231@example.com",
  "birthday": "1968-01-13",
  "auth_token": "3ZUKpM3CudFSmTrk8ncC5Rh9",
  "web_socket_token": "X5eSAgwVb8kZyZNMsGSgcQcR",
  "id": 1647,
  "username": "student 227",
  "name": "Miss Johann Gerlach",
  "type": "Student",
  "sex": 9,
  "picture_url": "/assets/img/common/user@3x.png",
  "level": -1,
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
  "unread_count": 0,
  "conversations": [

  ],
  "absence": 0,
  "is_favorite": false,
  "is_blocked": false,
  "grade": "member",
  "highly_reliable": false,
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
```

## POST /api/v1/students/validate.json
Renders error messages.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | optional |  | メールアドレス
password | string | optional |  | 新しいパスワード
name | string | optional |  | 名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
conversation_level | integer | optional |  | 日本語会話レベル
level | integer | optional |  | JLPT(日本語能力試験)のレベル
country | string | optional |  | 国コード/国名のリストは別途API経由で取得
timezone | string | optional |  | TimeZoneのリストは別途API経由で取得




### Example

#### Request

```
POST /api/v1/students/validate.json
Host: www.example.com

password=1
```

#### Response

```json
422


{
  "error": {
    "status": 422,
    "message": [
      "Password is too short (minimum is 8 characters)"
    ]
  },
  "lang": null
}
```

## GET /api/v1/students/hobbies.json
Returns selectable some hobbies.





### Example

#### Request

```
GET /api/v1/students/hobbies.json
Host: www.example.com
```

#### Response

```json
200


[
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
  },
  {
    "id": 4,
    "name": "History"
  },
  {
    "id": 5,
    "name": "Music"
  },
  {
    "id": 8,
    "name": "Travel"
  },
  {
    "id": 6,
    "name": "Art"
  },
  {
    "id": 9,
    "name": "Society"
  },
  {
    "id": 7,
    "name": "Philosophy"
  }
]
```

## GET /api/v1/students/purposes.json
Returns selectable some purposes.





### Example

#### Request

```
GET /api/v1/students/purposes.json
Host: www.example.com
```

#### Response

```json
200


[
  {
    "id": 5,
    "name": "To improve Japanese language ability"
  },
  {
    "id": 6,
    "name": "To immigrate to Japan"
  },
  {
    "id": 7,
    "name": "To work in Japan"
  },
  {
    "id": 8,
    "name": "To comprehend Japanese cultures"
  }
]
```

## POST /api/v1/students/password.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス




### Example

#### Request

```
POST /api/v1/students/password.json
Host: www.example.com

email=student%2B246%40example.com
```

#### Response

```json
200


{
}
```

## PATCH /api/v1/students/password.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
token | string | **required** |  | リセットトークン
password | string | **required** |  | 新しいパスワード




### Example

#### Request

```
PATCH /api/v1/students/password.json
Host: www.example.com

token=_3nsOREiRDbK2hotZZkjCw&password=new_password
```

#### Response

```json
200


{
}
```
