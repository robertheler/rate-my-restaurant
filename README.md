## Getting Started

### Environment Setup
```ssh
cd reservations
npm install
npm run compile
npm start
```

### Generate Data and Seeed the Database
```sh
  npm run generate-restaurants
  npm run generate-tables
  npm run generate-availability
  npm run seed-postgres
```
## Server API

### Get restaurant avaialability for given date and party size

- GET `/api/restaurants/:id/:date/:size`

**Path Parameters:**

- `id` restaurant id
- `date` requested date in MM-DD-YYYY format
- `size` party size

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
      "times": [
        "07:00",
        "08:00",
        "10:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "21:00",
        "22:00"
      ]
    },
    {
      "id": 43,
      "capacity": 8,
      "times": ["16:00", "21:00", "22:00"]
    },
    {
      "id": 47,
      "capacity": 8,
      "times": ["10:00", "12:00", "13:00", "17:00", "20:00"]
    }
  ]
}
```
### Get restaurant

- GET `/api/restaurants/:id`

**Path Parameters:**

- `id` restaurant id

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "name": "Restaurant Name",
  "address": "080 Miguel Rue, New Darnell, Virginia 22030-6037",
  "phone": "9917373138",
  "website": "www.czfxoxoov.com",
  "costrating": 2,
  "review": "4.52",
  "opens": "07:00",
  "closes": "22:00",
  "reservationslot": "0.25"
}
```

### Add restaurant

- POST `/api/restaurants`

**Success Status Code:** `201`

**Request Body**: Expects JSON with ANY of the following keys.

```json
{
  "name": "Restaurant Name",
  "address": "080 Miguel Rue, New Darnell, Virginia 22030-6037",
  "phone": "9917373138",
  "website": "www.czfxoxoov.com",
  "costrating": 2,
  "review": "4.52",
  "opens": "07:00",
  "closes": "22:00",
  "reservationslot": "0.25"
}
```

### Update availability for given table

- PATCH `/api/tables/:id`

**Path Parameters:**

- `id` table id

**Success Status Code:** `204`

**Request Body**: Expects JSON with dates to be updated (include only dates to be updated)

```json
{
  "MM-DD-YYYY": ["TT:TT", "TT:TT", "TT:TT", "TT:TT", "TT:TT", "TT:TT", "TT:TT"],
  "MM-DD-YYYY": ["TT:TT", "TT:TT", "TT:TT", "TT:TT"]
}
```

### Delete table and associated availability

- DELETE `/api/tables/:id`

**Path Parameters:**

- `id` table id

**Success Status Code:** `204`
