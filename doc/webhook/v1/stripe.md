## POST /webhook/v1/stripe/event.json
Returns ok.


### Parameters

Parameter | Type | Required | Format | Description
--- | --- | --- | --- | ---
type | string | **required** |  | Stripe Webbook event type




### Example

#### Request

```
POST /webhook/v1/stripe/event.json
Host: www.example.com

{
  "type": "stripe.webhook_name"
}
```

#### Response

```json
200

```
