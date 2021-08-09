## POST /webhook/v1/paypal/event.json
Returns ok.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
event_type | string | **required** |  | PayPal Webbook event_type attribute
resource | any | **required** |  | PayPal resource data




### Example

#### Request

```
POST /webhook/v1/paypal/event.json
Host: www.example.com

{
  "event_type": "paypal.webhook_name",
  "resource": {
    "id": "123456789",
    "name": "paypal.resource"
  }
}
```

#### Response

```json
200


{
}
```
