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

  test('It should respond to the GET method', () => {
    return request(app).get("/api/v1/foods").then(response => {
      expect(response.statusCode).toBe(200)
    })
  });

  test('It should list the foods', () => {
    return request(app).get("/api/v1/foods").then(response => {
      expect(response.body.length).toEqual(8)
      expect(response.body[0]["name"]).toContain("cheese")
    })
  })

  test('It should return a specific food', () => {
    return request(app).get("/api/v1/foods/1").then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body["id"]).toEqual(1)
      expect(response.body["name"]).toEqual("cheese")
    })
  })

  test('It should add a new food', () => {
    const newFood = {name: "test_food", calories: 0}
    return request(app).post("/api/v1/foods").send(newFood).then(response => {
      expect(response.body["message"]).toEqual("test_food has been added to your foods")
      expect(response.body["data"]["name"]).toEqual("test_food")
    })
  })

  test('It should edit a food', () => {
    const editFood = {name: "cheddar cheese"}
    return request(app).patch('/api/v1/foods/1').send(editFood).then(response => {
      expect(response.body["message"]).toEqual("cheddar cheese has been edited")
      expect(response.body["data"]["id"]).toEqual(1)
      expect(response.body["data"]["name"]).not.toEqual("cheese")
    })
  })
});
