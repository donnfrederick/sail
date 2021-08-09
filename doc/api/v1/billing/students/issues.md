## GET /api/v1/billing/students/issues/available.json
Returns user's billing status.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/billing/students/issues/available.json
Authorization: Bearer adhvSBTPhqsSsQJN5Jrd4zjC
Host: www.example.com
```

#### Response

```json
200


{
  "issues": [
    {
      "type": "free",
      "lang": null,
      "failure_code": null,
      "failure_message": null,
      "conversations": -1,
      "expired_at": null,
      "created_at": "2019-11-12T03:40:31+05:00",
      "updated_at": "2019-11-12T03:40:31+05:00"
    }
  ],
  "lang": null,
  "gracing": false
}
```
