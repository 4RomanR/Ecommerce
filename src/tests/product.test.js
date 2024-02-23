const request = require("supertest")
const app = require("../app")
require("../models")
const Category = require("../models/Category")
const URL_PRODUCT = '/products'
const URL_USER = '/users'

let TOKEN
let category
let product
let productId
beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: "fernando123"
    }
    const res = await request(app)
    .post(`${URL_USER}/login`)
    .send(user)
    TOKEN = res.body.token
    category = await Category.create({name:"Tecnology"})
    product = {
        title: 'Memoria SSD',
        description: 'Memoria con la máxima velocidad',
        price: 200,
        categoryId: category.id
    }
})

test("POST -> 'URL_PRODUCT', should return status 201, res.body toBeDefined, res.body.title === product.title ", async () => {
    const res = await request(app)
    .post(URL_PRODUCT)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)
    productId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)


})
test("GETALL -> 'URL_PRODUCT', should return status 200, toBeDefined and res.body.length === 1", async () => {
    const res = await request(app)
    .get(URL_PRODUCT)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GETONE -> 'URL_PRODUCT/:id' should return status 200, toBeDefined and res.body.title", async () => {
    const res = await request(app)
    .get(`${URL_PRODUCT}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBeDefined()
    expect(res.body.categoryId).toBe(category.id)
    
})

test("PUT -> 'URL_PRODUCT/:id', should return status 200, toBeDefined and res.body.title === 'Plato'", async () => {
    const res = await request(app)
    .put(`${URL_PRODUCT}/${productId}`)
    .send({title:"Plato"})
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe("Plato")
})

test("DELETE -> 'URL_PRODUCT/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${URL_PRODUCT}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    await category.destroy()
})