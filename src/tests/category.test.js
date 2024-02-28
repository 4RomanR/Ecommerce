require('../models')
const request = require("supertest")
const app = require("../app")

const URL_CATEGORY = "/categories"
const URL_USERS = '/users'
const category = {
    name: "Tecnología"
}
beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123"
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
})
let categoryId



test("POST -> 'URL_CATEGORY', should return status 201, res.body toBeDefined and res.body.name === category.name",async () => { 
    const res = await request(app)
        .post(URL_CATEGORY)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)
    categoryId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})
test("GETALL -> 'URL_CATEGORY', should return status 200, res.body toBeDefined and res.body toHaveLength=== 1", async () => {
    const res = await request(app)
    .get(URL_CATEGORY)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("DELETE -> 'URL_CATEGORY/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${URL_CATEGORY}/${categoryId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    
})