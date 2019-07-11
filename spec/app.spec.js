var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var pry = require('pryjs')
const session = require('../models/POJOs/session')


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
//       return request(app).get("/api/v1/foods").send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     });
//
//     test('It should list the foods', () => {
//       return request(app).get("/api/v1/foods").send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.body.length).toEqual(1)
//         expect(response.body[0]["name"]).toEqual("cheese")
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       return request(app).get("/api/v1/foods").send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('GET /api/v1/foods/:id', () => {
//     test('It should return a specific food', () => {
//       return request(app).get("/api/v1/foods/1").send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["id"]).toEqual(1)
//         expect(response.body["name"]).toEqual("cheese")
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       return request(app).get("/api/v1/foods/1").send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('POST /api/v1/foods', () => {
//     test('It should add a new food', () => {
//       const newFood = {apiKey: "XUrJTVKh20s2", name: "test_food", calories: 0}
//       return request(app).post("/api/v1/foods").send(newFood).send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["message"]).toEqual("test_food has been added to your foods")
//         expect(response.body["data"]["name"]).toEqual("test_food")
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       const newFood = {apiKey: "XUrJTVKh20s2", name: "test_food", calories: 0}
//       return request(app).post("/api/v1/foods").send(newFood).send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('PATCH /api/v1/foods/:id', () => {
//     test('It should edit a food', () => {
//       const editFood = {name: "cheddar cheese"}
//       return request(app).patch(`/api/v1/foods/1?apiKey=${editFood.apiKey}`).send(editFood).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["message"]).toEqual("cheddar cheese has been edited")
//         expect(response.body["data"]["id"]).toEqual(1)
//         expect(response.body["data"]["name"]).not.toEqual("cheese")
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       const editFood = {apiKey: "XUrJTVKh20s2", name: "cheddar cheese"}
//       return request(app).patch('/api/v1/foods/1').send(editFood).send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('DELETE /api/v1/foods/:id', () => {
//     test('It should delete a food', () => {
//       return request(app).delete('/api/v1/foods/1').send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body["message"]).toEqual("cheese has been deleted.")
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       return request(app).delete('/api/v1/foods/1').send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('GET /api/v1/meals', () => {
//     test('it should return all meals with their foods', () => {
//       return request(app).get(`/api/v1/meals?apiKey=XUrJTVKh20s2`).then(response => {
//         expect(response.statusCode).toBe(200)
//         expect(response.body[0]["id"]).toEqual(1)
//         expect(response.body[0]["foods"].length).toEqual(1)
//       })
//     })
//     test('it should return 401 without apiKey', () => {
//       return request(app).get('/api/v1/meals').then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   // describe('GET /api/v1/meals/:meal_id/foods?apiKey=XUrJTVKh20s2', () => {
//   //   test('it should return specific meal with its foods', () => {
//   //     return request(app).get('/api/v1/meals/1/foods').then(response => {
//   //       expect(response.statusCode).toBe(200)
//   //       expect(response.body["foods"].length).toEqual(3)
//   //       expect(response.body["foods"][0]["name"]).toEqual("apple")
//   //     })
//   //   })
//   //   xtest('it should return 401 without apiKey', () => {
//   //     return request(app).get('/api/v1/meals/1/foods').send({apiKey: "XUrJTVKh20s2"}).then(response => {
//   //       expect(response.statusCode).toBe(401)
//   //     })
//   //   })
//   // })
//
//   describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
//     test('it should add food to a meal', () => {
//       return request(app).post('/api/v1/meals/1/foods/1').send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(201)
//         // next test should change with route message change
//         expect(response.text).toEqual("message: Successfully added cheese to breakfast")
//       })
//     })
//     test('it should return 401 without apiKey', () => {
//       return request(app).post('/api/v1/meals/1/foods/1').then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
//
//   describe('DELETE /api/v1/meals/:meal_id/foods/:id', () => {
//     test('it should delete food_meal associated with meal', () => {
//       return request(app).delete('/api/v1/meals/1/foods/2').send({apiKey: "XUrJTVKh20s2"}).then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     })
//     xtest('it should return 401 without apiKey', () => {
//       return request(app).delete('/api/v1/meals/1/foods/2').then(response => {
//         expect(response.statusCode).toBe(401)
//       })
//     })
//   })
// });

// describe('user views', () => {
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
//   describe('GET /users', () => {
//     test('it should return a redirect 302', () => {
//       return request(app).get('/users').then(response => {
//         expect(response.statusCode).toBe(302)
//       })
//     })
//   })
//
//   describe('GET /users/login', () => {
//     test('it should return a redirect 200', () => {
//       return request(app).get('/users/login').then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     })
//     test('it should be the login page', () => {
//       return request(app).get('/users/login').then(response => {
//         expect(response.text).toContain('Log In')
//       })
//     })
//   })
//
//   describe('GET /users/welcome?apiKey=XUrJTVKh20s2', () => {
//     test('it should return a redirect 200', () => {
//       session.setKey("XUrJTVKh20s2")
//       return request(app).get('/users/welcome').then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     })
//     test('it should be the welcome page', () => {
//       session.setKey("XUrJTVKh20s2")
//       return request(app).get('/users/welcome').then(response => {
//         expect(response.text).toContain('WELCOME')
//       })
//     })
//     test('it should return a redirect 302 with no session.apiKey', () => {
//       return request(app).get('/users/welcome').then(response => {
//         session.deleteKey();
//         expect(response.statusCode).toBe(302)
//       })
//     })
//   })
//
//   describe('GET /users/account?apiKey=XUrJTVKh20s2', () => {
//     test('it should return a redirect 200', () => {
//       session.setKey("XUrJTVKh20s2")
//       return request(app).get('/users/account').then(response => {
//         expect(response.statusCode).toBe(200)
//       })
//     })
//     test('it should be the account page', () => {
//       session.setKey("XUrJTVKh20s2")
//       return request(app).get('/users/account').then(response => {
//         expect(response.text).toContain('jstones0@ted.com')
//       })
//     })
//     test('it should return a redirect 302 with no session.apiKey', () => {
//       return request(app).get('/users/account').then(response => {
//         session.deleteKey();
//         expect(response.statusCode).toBe(302)
//       })
//     })
//   })
// })


describe('Edamame Microservice', () => {
  beforeEach(() => {
    shell.exec('npx knex migrate:latest')
  })
  beforeEach(() => {
    shell.exec('npx knex seed:run')
  })
  afterEach(() => {
    shell.exec('npx knex migrate:rollback')
  })

  describe('GET /recipes/calories_search?q=chicken&calories=500-700', () => {
    test('it should return a 200', () => {
      return request(app).get('/api/v1/recipes/calories_search?q=chicken&calories=500-700').then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })

  describe('GET /recipes/ingredient_search?q=chicken&ingre=2-5', () => {
    test('it should return a 200', () => {
      return request(app).get('/api/v1/recipes/ingredient_search?q=chicken&ingr=2-5').then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })

  describe('GET /recipes/diet_search?q=chicken&diet=Peanut-Free', () => {
    test('it should return a 200', () => {
      return request(app).get('/api/v1/recipes/health_search?q=chicken&health=peanut-free').then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })

  describe('GET /recipes/diet_search?q=chicken&diet=Low-Carb', () => {
    test('it should return a 200', () => {
      return request(app).get('/api/v1/recipes/diet_search?q=chicken&diet=low-carb').then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })

  describe('GET /recipes/food_search?q=chicken', () => {
    test('it should return a 200', () => {
      return request(app).get('/api/v1/recipes/food_search?q=chicken').then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })
})
