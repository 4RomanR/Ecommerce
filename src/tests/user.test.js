const request = require('supertest')
const app = require("../app")
let TOKEN
const user = {
    firstName: 'Rene',
    lastName: 'Rivera',
    email: 'rene@gmail.com',
    password: 'rene123',
    phone: '+123123'
}
const URL_USERS = '/users'
beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123",
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
    console.log(TOKEN)
})

test("GETALL -> 'URL_USERS', should return status code 200, res.body toBeDefined and res.body.length === 1", async () => {
    const res = await request(app)
    .get(URL_USERS)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBe()
    expect(res.body).toHaveLength(1)
})
test("POST -> 'URL_USERS', should return status code 201, res.body toBeDefined and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
    .post(URL_USERS)
    .send(user)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})