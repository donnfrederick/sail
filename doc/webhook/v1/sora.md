## POST /webhook/v1/sora/connection.json
Returns block resource.





### Example

#### Request

```
POST /webhook/v1/sora/connection.json
Host: www.example.com

{
  "channel_id": "391b00bf-72a5-49b9-bacf-23a2e744e340",
  "client_id": "9d17ce24-5aa9-4298-9b46-5e502615bc2c",
  "data": {
    "audio": {
      "codec_type": "OPUS"
    },
    "channel_connections": 2,
    "channel_downstream_connections": 1,
    "channel_upstream_connections": 2,
    "minutes": 0,
    "total_received_bytes": 0,
    "total_sent_bytes": 0,
    "video": {
      "bit_rate": 500,
      "codec_type": "VP9"
    }
  },
  "id": "5710e0fc-348b-458f-addd-ce2bb5d166b6",
  "label": "WebRTC SFU Sora",
  "multistream": false,
  "role": "upstream",
  "timestamp": "2017-08-13T07:08:14.346280Z",
  "type": "connection.created",
  "version": "17.08.0"
}
```

#### Response

```json
201


{
}
```
