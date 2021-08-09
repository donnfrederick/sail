## POST /api/v1/organizations/signin.json
Signin staff.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
email | string | **required** |  | メールアドレス（または、ユーザー名）
password | string | **required** |  | パスワード
fcm_token | string | optional |  | 




### Example

#### Request

```
POST /api/v1/organizations/signin.json
Host: www.example.com

email=staff%2B1%40example.com&password=password
```

#### Response

```json
200


{
  "id": 25,
  "auth_token": "YPW2PNexkMY46AkDZz3T1f8X"
}
```
