var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var pry = require('pryjs')

describe('api', () => {
  beforeEach(() => {
    shell.exec('npx knex migrate:latest')
  })
  beforeEach(() => {
    shell.exec('npx knex seed:run')
  })
  afterEach(() => {
    shell.exec('npx knex migrate:rollback')
  })

  describe('GET /api/v1/foods', () => {
    test('It should respond to the GET method', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });

    test('It should list the foods', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.body.length).toEqual(8)
        expect(response.body[0]["name"]).toEqual("cheese")
      })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    test('It should return a specific food', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body["id"]).toEqual(1)
        expect(response.body["name"]).toEqual("cheese")
      })
    })
  })

  describe('POST /api/v1/foods', () => {
    test('It should add a new food', () => {
      const newFood = {name: "test_food", calories: 0}
      return request(app).post("/api/v1/foods").send(newFood).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body["message"]).toEqual("test_food has been added to your foods")
        expect(response.body["data"]["name"]).toEqual("test_food")
      })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    test('It should edit a food', () => {
      const editFood = {name: "cheddar cheese"}
      return request(app).patch('/api/v1/foods/1').send(editFood).then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body["message"]).toEqual("cheddar cheese has been edited")
        expect(response.body["data"]["id"]).toEqual(1)
        expect(response.body["data"]["name"]).not.toEqual("cheese")
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    xtest('It should delete a food', () => {
      return request(app).delete('/api/v1/foods/1').then(response => {
        expect(response.statusCode).toBe(200)
        console.log(response.error)
        expect(response.body["message"]).toEqual("cheese has been deleted.")
      })
    })
  })

  describe('GET /api/v1/meals', () => {
    test('it should return all meals with their foods', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0]["id"]).toEqual(1)
        expect(response.body[0]["foods"].length).toEqual(3)
      })
    })
  })

  describe('GET /api/v1/meals/:meal_id/foods', () => {
    test('it should return specific meal with its foods', () => {
      return request(app).get('/api/v1/meals/1/foods').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body["foods"].length).toEqual(3)
        expect(response.body["foods"][0]["name"]).toEqual("apple")
      })
    })
  })

  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    test('it should add food to a meal', () => {
      return request(app).post('/api/v1/meals/1/foods/1').then(response => {
        expect(response.statusCode).toBe(200)
        // next test should change with route message change
        expect(response.text).toEqual("message: Successfully added cheese to breakfast")
      })
    })
  })

  describe('DELETE /api/v1/meals/:meal_id/foods/:id', () => {
    xftest('it should delete food_meal associated with meal', () => {
      return request(app).delete('/api/v1/meals/1/foods/2').then(response => {
        expect(response.statusCode).toBe(200)
        console.log(response.body)
      })
    })
  })
});






// describe('api', () => {
//   beforeEach(() => {
//     shell.exec('npx knex migrate:latest')
//   })
//   beforeEach(() => {
//     shell.exec('npx knex seed:run')
//   })
//   afterEach(() => {
//     shell.exec('npx knex migrate:rollback')
//   })
//
//   describe('GET /api/v1/foods', () => {
//     test('It should respond to the GET method', () => {
//       return request(app).get("/api/v1/foods").send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     });
//
//     test('It should list the foods', () => {
//       return request(app).get("/api/v1/foods").send({api_key: "1234"}).then(response => {
//         expect(response.body.length).toEqual(8)
//         expect(response.body[0]["name"]).toEqual("cheese")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).get("/api/v1/foods").send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('GET /api/v1/foods/:id', () => {
//     test('It should return a specific food', () => {
//       return request(app).get("/api/v1/foods/1").send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["id"]).toEqual(1)
//         expect(response.body["name"]).toEqual("cheese")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).get("/api/v1/foods/1").send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('POST /api/v1/foods', () => {
//     test('It should add a new food', () => {
//       const newFood = {api_key: "1234", name: "test_food", calories: 0}
//       return request(app).post("/api/v1/foods").send(newFood).send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["message"]).toEqual("test_food has been added to your foods")
//         expect(response.body["data"]["name"]).toEqual("test_food")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       const newFood = {api_key: "1234", name: "test_food", calories: 0}
//       return request(app).post("/api/v1/foods").send(newFood).send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('PATCH /api/v1/foods/:id', () => {
//     test('It should edit a food', () => {
//       const editFood = {api_key: "1234", name: "cheddar cheese"}
//       return request(app).patch('/api/v1/foods/1').send(editFood).send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["message"]).toEqual("cheddar cheese has been edited")
//         expect(response.body["data"]["id"]).toEqual(1)
//         expect(response.body["data"]["name"]).not.toEqual("cheese")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       const editFood = {api_key: "1234", name: "cheddar cheese"}
//       return request(app).patch('/api/v1/foods/1').send(editFood).send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('DELETE /api/v1/foods/:id', () => {
//     xtest('It should delete a food', () => {
//       return request(app).delete('/api/v1/foods/1').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         console.log(response.error)
//         expect(response.body["message"]).toEqual("cheese has been deleted.")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).delete('/api/v1/foods/1').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('GET /api/v1/meals', () => {
//     test('it should return all meals with their foods', () => {
//       return request(app).get('/api/v1/meals').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body[0]["id"]).toEqual(1)
//         expect(response.body[0]["foods"].length).toEqual(3)
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).get('/api/v1/meals').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('GET /api/v1/meals/:meal_id/foods', () => {
//     test('it should return specific meal with its foods', () => {
//       return request(app).get('/api/v1/meals/1/foods').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["foods"].length).toEqual(3)
//         expect(response.body["foods"][0]["name"]).toEqual("apple")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).get('/api/v1/meals/1/foods').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
//     test('it should add food to a meal', () => {
//       return request(app).post('/api/v1/meals/1/foods/1').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         // next test should change with route message change
//         expect(response.text).toEqual("message: Successfully added cheese to breakfast")
//       })
//     })
//     test('it should return 401 without api_key', () => {
//       return request(app).post('/api/v1/meals/1/foods/1').send({api_key: "1"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('DELETE /api/v1/meals/:meal_id/foods/:id', () => {
//     xftest('it should delete food_meal associated with meal', () => {
//       return request(app).delete('/api/v1/meals/1/foods/2').send({api_key: "1234"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         console.log(response.body)
//       })
//     })
//     xftest('it should return 401 without api_key', () => {
//       return request(app).delete('/api/v1/meals/1/foods/2').send({api_key: "1"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
// });
