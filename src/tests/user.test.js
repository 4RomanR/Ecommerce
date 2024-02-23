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
let userId
test("GETALL -> 'URL_USERS', should return status code 200, res.body toBeDefined and res.body.length === 1", async () => {
    const res = await request(app)
    .get(URL_USERS)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("POST -> 'URL_USERS', should return status code 201, res.body toBeDefined and res.body.firstName === user.firstName", async () => {
    const res = await request(app)
    .post(URL_USERS)
    .send(user)
    userId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})
test("PUT -> 'URL_USERS/:id', should return status code 200, res.body toBeDefined and res.body.firstName = 'Frednerys'", async () => {
    const res = await request(app)
    .put(`${URL_USERS}/${userId}`)
    .send({firstName:'Frednerys'})
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('Frednerys')
})
test("POST -> 'URL_USERS/login', should return status 200, res.body toBeDefined and res.body.user.email === user.email, and res.body.token toBeDefined", async () => {
    const userLogin = {
        email: "rene@gmail.com",
        password: "rene123"
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(userLogin)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})
test("POST -> 'URL_USERS/login', should return status 401", async () => {
    const userLogin = {
        email: "rene@gmail.com",
        password: "ligia1234"
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(userLogin)

    expect(res.status).toBe(401)
})
test("DELETE -> 'URL_USERS/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${URL_USERS}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)
})