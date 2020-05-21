## Server API

### Get restaurant avaialability for given date and party size
  * GET `/api/restaurants/:id/:date/:size`

**Path Parameters:**
  * `id` restaurant id
  * `date` requested date in MM-DD-YYYY format
  * `size` party size

**Success Status Code:** `200`

**Returns:** JSON

```json
{
    "id": "5",
    "name": "non nisi",
    "date": "5-23-2020",
    "tables": [
        {
            "id": 41,
            "capacity": 9,
            "times": ["07:00","08:00","10:00","14:00","15:00","16:00","17:00","21:00","22:00"]
        },
        {
            "id": 43,
            "capacity": 8,
            "times": ["16:00","21:00","22:00"]
                
        },
        {
            "id": 47,
            "capacity": 8,
            "times": ["10:00","12:00", "13:00","17:00","20:00"]
        }
    ]
}
```

### Add restaurant
  * POST `/api/restaurants`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "googleMap": "String location",
      "costRating": "Number",
      "review": "Number"
    }
```


### Update restaurant info
  * PATCH `/api/restaurant/:id`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "cost": "Number"
    }
```

### Delete restaurant
  * DELETE `/api/restaurant/:id`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `204`

### Add image to restaurant
  * POST `/api/restaurants/:restaurantId/images`

**Path Parameters:**

  * `restaurantId` restaurant id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "user": "String",
      "image": "image URL",
      "description": "String",
      "posted": "YYYY-MM-MM",
      "googleMap": "String location",
      "category": "String",
      "restaurant": "id Number",
      "cost": "Number"
    }
```








``json
{
  "restaurant_id": "Number",
  "restaurant_name": "String",
  "dates": {
    "07/12/2020": [
      {
        "table_id": "Number",
        "table_capacity": "Number",
        "available_times": [
          "08:00", "11:00", "12:00", "13:00","14:00","16:00","17:00","22:00","23:00"
        ]
      }
    ],
    "08/16/2020": [
      {
        "table_id": 45,
        "table_capacity": 4,
        "available_times": ["20:00", "21:00"]
      },
      {
        "table_id": 47,
        "table_capacity": 4,
        "available_times": ["10:00", "17:00", "21:00", "22:00"]
      }
    ]
  }
}

```

### Add restaurant
  * POST `/api/restaurants`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "googleMap": "String location",
      "cost": "Number"
    }
```


### Update restaurant info
  * PATCH `/api/restaurant/:id`

**Path Parameters:**
  * `id` restaurant id
