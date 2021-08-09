## POST /api/v1/teachers.json
Renders resource created (`rated_conversation_level`が`nil`のときは未評価を意味します).


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス
password | string | **required** |  | パスワード
name | string | **required** |  | 名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
picture | any | **required** |  | multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)
desired_condition | integer | **required** | Only<br>[1, 2] | 1:日本語が得意な方がいい, 2:日本語が不得意でも構わない
hobbies | array | **required** |  | 最大3つまで<br>1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会
purposes | array | **required** |  | 最大3つまで<br>1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい
fcm_token | string | optional |  | 




### Example

#### Request

```
POST /api/v1/teachers.json
Host: www.example.com

{
  "email": "test-user@example.com",
  "password": "password",
  "name": "えのもと けんたろう",
  "sex": 1,
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
  "auth_token": "WKVwHJ465jJZnLPA8g9dkZ96",
  "web_socket_token": "RWhcjhj5wsuCNzpibC7ErGyb",
  "id": 1676,
  "username": "a6e00b32-474e-41ee-842e-e8eb9646a8d6",
  "name": "えのもと けんたろう",
  "type": "Teacher",
  "sex": 1,
  "picture_url": "/uploads/teacher/picture/1676/13833b3c-019d-4f15-80ea-2ac426e5edd9.jpeg",
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
```

## GET /api/v1/teachers/me.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/teachers/me.json
Authorization: Bearer i9WTnkLCyJL9jn7FMbY2tdki
Host: www.example.com
```

#### Response

```json
200


{
  "email": "teacher+150@example.com",
  "birthday": "1976-11-15",
  "auth_token": "i9WTnkLCyJL9jn7FMbY2tdki",
  "web_socket_token": "f4jag6nZFs7WKyBRHNSFYMHV",
  "id": 1684,
  "username": "teacher 146",
  "name": "はまの ふうは",
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
```

## GET /api/v1/teachers/:id.json
Returns the resosurce.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/teachers/1686.json
Authorization: Bearer J2YxMzRwoc4MjmukQfFWHbgU
Host: www.example.com
```

#### Response

```json
200


{
  "id": 1686,
  "username": "teacher 148",
  "name": "かさい こうすけ",
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
  ],
  "organizations": [

  ],
  "organization_sections": [

  ]
}
```

## GET /api/v1/teachers/:id/evaluations.json
アクセスユーザーとこのシニアユーザーが行った会話のみの、未評価会話データ、メモデータ、報告データを取得します。なお、ブロック中の場合は履歴に表示されません。`memos`は`[{timestamp: string, memo: string},...]`として、、`reports`は`[{timestamp: string, report: string},...]`として、`unrated_conversation`は`[{timestamp: string, id: integer},...]`として返します。このとき、`unrated_conversation`の`id`は`conversation.id`を指します。.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/teachers/1690/evaluations.json
Authorization: Bearer zWDDYhY9WjXBFUyaNgkFdUoh
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

## PATCH /api/v1/teachers/me.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | optional |  | メールアドレス
current_password | string | optional |  | 現在のパスワード
password | string | optional |  | 新しいパスワード
name | string | optional |  | 名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
picture | any | optional |  | multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)
desired_condition | integer | optional | Only<br>[1, 2] | 1:日本語が得意な方がいい, 2:日本語が不得意でも構わない
hobbies | array | optional |  | 最大3つまで<br>1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会
purposes | array | optional |  | 最大3つまで<br>1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい
fcm_token | string | optional |  | 



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/teachers/me.json
Authorization: Bearer X54TFK83pbnBnsH8BTCJdHLu
Host: www.example.com

name=%E3%81%93%E3%81%8C+%E3%82%84%E3%81%99%E3%81%88
```

#### Response

```json
200


{
  "email": "teacher+160@example.com",
  "birthday": "1995-10-30",
  "auth_token": "X54TFK83pbnBnsH8BTCJdHLu",
  "web_socket_token": "Cf4a2gBvSFcDa4fSij84aVN9",
  "id": 1694,
  "username": "teacher 156",
  "name": "こが やすえ",
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
```

## PATCH /api/v1/teachers/me.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | optional |  | メールアドレス
current_password | string | optional |  | 現在のパスワード
password | string | optional |  | 新しいパスワード
name | string | optional |  | 名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
picture | any | optional |  | multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)
desired_condition | integer | optional | Only<br>[1, 2] | 1:日本語が得意な方がいい, 2:日本語が不得意でも構わない
hobbies | array | optional |  | 最大3つまで<br>1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会
purposes | array | optional |  | 最大3つまで<br>1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい
fcm_token | string | optional |  | 



### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
PATCH /api/v1/teachers/me.json
Authorization: Bearer B8z2KRArdSitZofy4VNGv5vc
Host: www.example.com

name=%E7%AF%A0%E5%B4%8E+%E6%9F%9A%E6%9D%8E
```

#### Response

```json
422


{
  "error": {
    "status": 422,
    "message": [
      "名前は「ひらがな」で入力してください"
    ]
  },
  "lang": null
}
```

## POST /api/v1/teachers/validate.json
Renders error messages.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | optional |  | メールアドレス
password | string | optional |  | 新しいパスワード
name | string | optional |  | 名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結
sex | integer | optional | Only<br>[0, 1, 2, 9] | 1: 男性, 2: 女性, 9: その他
desired_condition | integer | optional | Only<br>[1, 2] | 1:日本語が得意な方がいい, 2:日本語が不得意でも構わない




### Example

#### Request

```
POST /api/v1/teachers/validate.json
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
      "パスワードは8文字以上です"
    ]
  },
  "lang": null
}
```

## GET /api/v1/teachers/hobbies.json
Returns selectable some hobbies.





### Example

#### Request

```
GET /api/v1/teachers/hobbies.json
Host: www.example.com
```

#### Response

```json
200


[
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
  },
  {
    "id": 4,
    "name": "歴史"
  },
  {
    "id": 5,
    "name": "音楽"
  },
  {
    "id": 8,
    "name": "旅行"
  },
  {
    "id": 6,
    "name": "芸術"
  },
  {
    "id": 9,
    "name": "社会"
  },
  {
    "id": 7,
    "name": "哲学"
  }
]
```

## GET /api/v1/teachers/purposes.json
Returns selectable some purposes.





### Example

#### Request

```
GET /api/v1/teachers/purposes.json
Host: www.example.com
```

#### Response

```json
200


[
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
  },
  {
    "id": 4,
    "name": "日本語を教えたい"
  }
]
```

## POST /api/v1/teachers/password.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス




### Example

#### Request

```
POST /api/v1/teachers/password.json
Host: www.example.com

email=teacher%2B177%40example.com
```

#### Response

```json
200


{
}
```

## PATCH /api/v1/teachers/password.json
Renders resource updated.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
token | string | **required** |  | リセットトークン
password | string | **required** |  | 新しいパスワード




### Example

#### Request

```
PATCH /api/v1/teachers/password.json
Host: www.example.com

token=h6J6BHb9cFEiFVzQifyogA&password=new_password
```

#### Response

```json
200


{
}
```
