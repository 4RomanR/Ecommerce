const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')


const URL_PURCHASE = '/purchase'
const URL_USERS = '/users'

const purchase = {
    quantity: "12"
}
let product

beforeAll( async() => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123"
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token

    product = await Product.create({
            title: 'Memoria SSD',
            description: 'Memoria con la máxima velocidad',
            price: 20.04
    })
})

test("POST -> 'URL_PURCHASE', should return status 201, toBeDefined and res.body.quantity === purchase.quantity", async () => {
    const res = await request(app)
    .post(URL_PURCHASE)
    .send(purchase)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(purchase.quantity)
    await product.destroy() 
})

test("GETALL -> 'URL_PURCHASE', should return status 200, toBeDefined and res.body.length === 1, ... ", async () => {
    const res = await request(app)
    .get(URL_PURCHASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].product.id).toBe(product.id)
    
})