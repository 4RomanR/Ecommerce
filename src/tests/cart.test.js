require('../models')
const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")


const URL_CART = '/cart'
let URL_USERS = '/users/login'
let TOKEN
let product
let bodyCart
let bodyProduct
let userId
let cartId

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123",
    }
    const res = await request(app)
    .post(URL_USERS)
    .send(user)
    
    TOKEN = res.body.token
    userId = res.body.user.id

    bodyProduct = {
        title: 'franela',
        description: 'Camisa gruesa de color verde',
        price: 30.30
    }
    product = await Product.create(bodyProduct)
    
    bodyCart = {
        quantity: 1,
        productId: product.id
    }
})  

test('POST -> "URL_CART", should return status 201, res.body toBeDefined and res.body.quantity === bodyCart.quantity', async () => { 
    const res = await request(app)
    .post(URL_CART)
    .send(bodyCart)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    cartId = res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(bodyCart.quantity)
    expect(res.body.userId).toBe(userId)
    
 })

 test('GETALL -> "URL_CART", should return status 200, res.body toBeDefined and res.body.length ==== 1', async () => {
    const res = await request(app)
    .get(URL_CART)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)

    expect(res.body[0].productId).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)

 })
 test('GETONE -> "URL_CART/:id", should return status 200, res.body toBeDefined and res.body.quantity ==== bodyCart.quantity', async () => {
    const res = await request(app)
    .get(`${URL_CART}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(bodyCart.quantity)
    
    expect(res.body.userId).toBeDefined()
    expect(res.body.userId).toBe(userId)
    
    expect(res.body.productId).toBeDefined()
    expect(res.body.productId).toBe(product.id)
  

   
 })

test('PUT -> "URL_CART/:id", should return status 200, res.body toBeDefined and res.body.quantity toBe 3', async () => {
    const res = await request(app)
    .put(`${URL_CART}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({ quantity: 3 })

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(3)
    
})

test('DELETE -> "URL_CART/:id", should return status 204', async () => {
    const res = await request(app)
    .delete(`${URL_CART}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)
    
    await product.destroy()
})
