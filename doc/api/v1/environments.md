## GET /api/v1/environments.json
Returns environments.





### Example

#### Request

```
GET /api/v1/environments.json
Host: www.example.com
```

#### Response

```json
200


{
  "sora_signaling_url": "wss://sora1d.sail.helte.jp/signaling",
  "sora_api_url": "https://sora1d.sail.helte.jp:443/api",
  "app_socket_url": "ws://localhost:3000/cable/v1?ws_token="
}
```
