const request = require('supertest')
const app = require('../app')


const URL_PURCHASE = '/purchase'
const URL_USERS = '/users'

const purchase = {
    quantity: "12"
}

beforeAll( async() => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123"
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
})

test("POST -> 'URL_PURCHASE', should return status 201, toBeDefined and res.body.quantity === purchase.quantity", async () => {
    const res = await request(app)
    .post(URL_PURCHASE)
    .send(purchase)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(purchase.quantity)
})

test("")