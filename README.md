# RateMyRestaurant
## Query-Optimized Postgres Database With Over 10,000,0000 Records
![Sample Query](/demos/query.png)
## Verically and Horizontally Scalabale Using AWS EC2
### Tested Architectures
<table><thead><tr><th>App Instance</th><th># App Instances</th><th>Nginx Instance</th><th>Postgres Instance</th><th>vCPUs</th><th>Memory (GB)</th><th>Max RPS</th><th>1000 RPS</th><th>1500 RPS</th><th>2000 RPS</th><th>3000 RPS</th><th>Max RPS/ App Instance</th><th>Average Time (ms)</th><th>Error (%)</th><th>Error (%)</th></tr></thead><tbody><tr><td>t3a.2xlarge</td><td>6</td><td>t3a.2xlarge</td><td>t3a.2xlarge</td><td>64</td><td>256</td><td>10000</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>1666.666667</td><td>1349</td><td>0.1</td><td>0.1</td></tr><tr><td>t3a.2xlarge</td><td>5</td><td>m5d.4xlarge</td><td>t3a.2xlarge</td><td>64</td><td>256</td><td>5000</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>1000</td><td>231</td><td>0</td><td>0</td></tr><tr><td>t3a.2xlarge</td><td>5</td><td>t3a.2xlarge</td><td>t3a.2xlarge</td><td>56</td><td>224</td><td>4500</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>900</td><td>400</td><td>1.4</td><td>1.4</td></tr><tr><td>t3a.2xlarge</td><td>3</td><td>t3a.2xlarge</td><td>t3a.2xlarge</td><td>40</td><td>160</td><td>3000</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td><td>1000</td><td>2070</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>15</td><td>t2.micro</td><td>t2.micro</td><td>17</td><td>17</td><td>2000</td><td>✓</td><td>✓</td><td>✓</td><td></td><td>133.3333333</td><td>7</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>3</td><td>t3a.2xlarge</td><td>t3a.2xlarge</td><td>19</td><td>131</td><td>2000</td><td>✓</td><td>✓</td><td>✓</td><td></td><td>666.6666667</td><td>1978</td><td>0.3</td><td>0.3</td></tr><tr><td>t3a.2xlarge</td><td>3</td><td>t3a.2xlarge</td><td>t2.micro</td><td>33</td><td>257</td><td>1700</td><td>✓</td><td>✓</td><td></td><td></td><td>566.6666667</td><td>320</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>3</td><td>t3a.2xlarge</td><td>t2.micro</td><td>12</td><td>68</td><td>1600</td><td>✓</td><td>✓</td><td></td><td></td><td>533.3333333</td><td>106</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>10</td><td>t2.micro</td><td>t2.micro</td><td>12</td><td>12</td><td>1300</td><td>✓</td><td></td><td></td><td></td><td>130</td><td>5</td><td>0</td><td>0</td></tr><tr><td>t3a.2xlarge</td><td>3</td><td>t2.micro</td><td>t3a.2xlarge</td><td>33</td><td>257</td><td>1000</td><td>✓</td><td></td><td></td><td></td><td>333.3333333</td><td>6</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>3</td><td>t2.micro</td><td>t2.micro</td><td>5</td><td>5</td><td>600</td><td></td><td></td><td></td><td></td><td>200</td><td>66</td><td>0</td><td>0</td></tr><tr><td>t3a.2xlarge</td><td>3</td><td>t2.micro</td><td>t2.micro</td><td>26</td><td>194</td><td>500</td><td></td><td></td><td></td><td></td><td>166.6666667</td><td>38</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>3</td><td>t2.micro</td><td>t3a.2xlarge</td><td>12</td><td>68</td><td>500</td><td></td><td></td><td></td><td></td><td>166.6666667</td><td>3</td><td>0</td><td>0</td></tr><tr><td>t2.micro</td><td>1</td><td></td><td>t2.micro</td><td>2</td><td>2</td><td>400</td><td></td><td></td><td></td><td></td><td>400</td><td>58</td><td>0.2</td><td>0.2</td></tr></tbody></table>

### Sample loader.io Output for 2500 Clients/Second Stress Test (11ms Response Time) 
![Sample Loader.io](/demos/2500vsu.png)

## React Calendar & Booking Component
by Kiefer Ragay https://github.com/patriot898

![Sample Component](/demos/component.gif)

## Server API
### Routes (See Examples Below)
GET
`/api/restaurants/:id`
`/api/tables/:id`
`/api/availability/:id`
`/api/restaurants/:id/:date/:size`

POST
`/api/restaurants`
`/api/tables`
`/api/availability`

PATCH
`/api/restaurants/:id`
`/api/tables/:id`
`/api/availability/:id`

DELETE
`/api/restaurants/:id`
`/api/tables/:id`
`/api/availability/:id`

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
      "times": ["07:00", "08:00", "10:00", "14:00", "15:00", "16:00", "17:00", "21:00", "22:00"]
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
