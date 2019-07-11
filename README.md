# Quantified Self
by Carrie Walsh & Ethan Grab

Deployed site: https://stormy-brushlands-92125.herokuapp.com/
Microservice site:

This pair project is our second working with JavaScript and Express to build an API. The API stores data about foods and meals for users that can register, sign in, and are given an API key.

The frontend of the site allows the user to log in and see all their saved meals, look through foods, and search for recipes.

The main site provides the API and front end whereas the microservice is the middleman between the Edamam API and the main site.


## Endpoints

### GET `api/v1/foods`

request:
```javascript
 Content-Type: application/json
 Accept: application/json

 body:
 {
   "api_key": "jgn983hy48thw9begh98h4539h4"
 }
```
response:
```javascript
[
    {
        "id": 2,
        "name": "apple",
        "calories": "95",
        "created_at": "2019-07-02T20:38:17.957Z",
        "updated_at": "2019-07-02T20:38:17.957Z"
    },
    {
        "id": 3,
        "name": "roll",
        "calories": "77",
        "created_at": "2019-07-02T20:38:17.959Z",
        "updated_at": "2019-07-02T20:38:17.959Z"
    },
    {
        "id": 4,
        "name": "grapes",
        "calories": "62",
        "created_at": "2019-07-02T20:38:17.959Z",
        "updated_at": "2019-07-02T20:38:17.959Z"
    }
]
```
404:
```javascript
{
  "error": "No foods here yet!"
}
```
### GET `api/v1/foods/:id`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
    "id": 1,
    "name": "cheese",
    "calories": "87",
    "created_at": "2019-07-02T20:38:17.955Z",
    "updated_at": "2019-07-02T20:38:17.955Z"
}
```
404:
```javascript
{
    "error": "No food exists with that ID"
}
```
### POST `api/v1/foods`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "name": "blueberries",
  "calories": "85",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
    "message": "marshmallow has been added to your foods",
    "data": {
        "name": "marshmallow",
        "calories": "25",
        "id": 18
    }
}
```
### PATCH `api/v1/foods/:id`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "calories": "234",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
    "message": "Baklava has been edited",
    "data": {
        "name": "Baklava",
        "id": 14,
        "calories": "234",
        "created_at": "2019-07-03T13:56:50.696Z",
        "updated_at": "2019-07-03T13:56:50.696Z"
    }
}
```
404:
```javascript
{
    "error": "No food exists with that ID"
}
```
### DELETE `api/v1/foods/:id`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
     "message": "celery has been deleted."
}
```
404:
```javascript
{
    "error": "No food exists with that ID"
}
```

### GET `api/v1/meals`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
[
    {
        "id": 1,
        "name": "breakfast",
        "created_at": "2019-07-02T20:38:17.963Z",
        "updated_at": "2019-07-02T20:38:17.963Z",
        "foods": [
            {
                "id": 8,
                "name": "egg",
                "calories": "78",
                "created_at": "2019-07-02T20:38:17.964Z",
                "updated_at": "2019-07-02T20:38:17.964Z"
            },
            {
                "id": 8,
                "name": "egg",
                "calories": "78",
                "created_at": "2019-07-02T20:38:17.964Z",
                "updated_at": "2019-07-02T20:38:17.964Z"
            },
            {
                "id": 2,
                "name": "apple",
                "calories": "95",
                "created_at": "2019-07-02T20:38:17.957Z",
                "updated_at": "2019-07-02T20:38:17.957Z"
            }
        ]
    },
    {
        "id": 2,
        "name": "snack",
        "created_at": "2019-07-02T20:38:17.963Z",
        "updated_at": "2019-07-02T20:38:17.963Z",
        "foods": [
            {
                "id": 4,
                "name": "grapes",
                "calories": "110",
                "created_at": "2019-07-02T20:38:17.964Z",
                "updated_at": "2019-07-02T20:38:17.964Z"
            }
        ]
    }
]
```
404:
```javascript
```
### GET `api/v1/meals/:meal_id/foods`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
    "id": 3,
    "name": "snack",
    "created_at": "2019-07-02T20:38:17.965Z",
    "updated_at": "2019-07-02T20:38:17.965Z",
    "foods": [
        {
            "id": 7,
            "name": "carrots",
            "calories": "25",
            "created_at": "2019-07-02T20:38:17.962Z",
            "updated_at": "2019-07-02T20:38:17.962Z"
        }
    ]
}
```
404:
```javascript
```
### POST `api/v1/meals/:meal_id/foods/:id`
request:
```javascript
```
response:
```javascript
{
     "message": "Successfully added apple to breakfast."
}
```
### DELETE `api/v1/meals/:meal_id/foods/:id`
request:
```javascript
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
response:
```javascript
{
  "message": "Successfully unrelated"
}
```


## Getting Started

### Requirements

Requires Node 12.1.0 and Express 4.16.1

### Setup

Clone down the repo and package install:
`$ git clone https://github.com/Stoovles/quant_self.git`

`$ npm install`

Set up the databases (dev and test):

```
$ psql
> CREATE DATABASE quant_self;
> CREATE DATABASE quant_self_test;
> \q
```

`$ npx knex migrate:latest`

`$ npx knex seed:run`

## Schema

![Quantified Self Schema](/schema.png?raw=true "Quantified Self Schema")

## Authors

At the time of this project, we are halfway through our last Mod at Turing School of Software & Design.

Carrie Walsh:
- https://github.com/carriewalsh
- https://alumni.turing.io/alumni/carrie-walsh
Ethan Grab:
- https://github.com/Stoovles/
- https://alumni.turing.io/alumni/ethan-grab
