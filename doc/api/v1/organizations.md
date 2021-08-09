## GET /api/v1/organizations/users.json
Returns some users.




### Headers

Header | Value | Description
--- | --- | ---
Authorization | Bearer <auth_token> | user.auth_token (required)


### Example

#### Request

```
GET /api/v1/organizations/users.json
Authorization: Bearer RfpKe7vxUdG9HNK9AdkFxoDL
Host: www.example.com
```

#### Response

```json
200


[
  {
    "id": 1604,
    "name": "あだち えり",
    "picture_url": "/uploads/teacher/picture/1604/9fcc81f0-94b2-4326-8747-b525af26af3b.png",
    "auth_token": "A4dkYWB1v4qM7742SVxTfSmx"
  },
  {
    "id": 1605,
    "name": "あさの さとこ",
    "picture_url": "/uploads/teacher/picture/1605/d7c825d0-1c25-4c8c-9c71-9481e30f609f.png",
    "auth_token": "7XTQDp2U8eaxazAxfQuTuz8H"
  },
  {
    "id": 1606,
    "name": "にしおか よしまさ",
    "picture_url": "/uploads/teacher/picture/1606/a8820922-22b3-4f90-b461-4f4e9d1e1711.png",
    "auth_token": "14z3LefzLwXgrQQMNiQXxkZp"
  },
  {
    "id": 1607,
    "name": "やまぐち たかあき",
    "picture_url": "/uploads/teacher/picture/1607/5bd84c06-b7ff-4f2f-9e27-40bc705c17ed.png",
    "auth_token": "He2LW3Y69SXvy5Srz95phir6"
  }
]
```
