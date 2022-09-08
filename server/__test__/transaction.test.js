const request = require("supertest")
const app = require("../app")
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('GET /transactions success', () => {
    it('Should be return an object', async () => {
        return request(app)
            .get('/transactions')
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('transaction')
                expect(response.body).toHaveProperty('transaction', expect.any(Object))
            })
    })
})

describe('POST /transactions success', () => {
    it('Should be return an object', async () => {
        return request(app)
            .post('/transactions')
            .send({ name: "test", amount: 1000000, date: new Date(), UserId: 1, CategoryId: 1, WalletId: 1 })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message')
                expect(response.body).toHaveProperty('transaction')
                expect(response.body).toHaveProperty('transaction', expect.any(Object))
            })
    })
})

describe('POST /transactions error input field not exist or empty string', () => {
    it("Should be return an object", async () => {
        return request(app)
            .post('/transactions')
            .send({})
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message')
                expect(response.body).toHaveProperty('message', expect.any(Object))
            })
    })
})