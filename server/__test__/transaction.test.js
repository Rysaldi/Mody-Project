const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

let access_token;

const userData = require("../data/user.json");
userData.forEach((el) => {
	el.password = hashPassword(el.password);
	el.createdAt = new Date();
	el.updatedAt = new Date();
});

const walletData = [
	{
		name: "walletTest",
		balance: 1000000,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "walletTest2",
		balance: 1000000,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const categoryData = [
	{
		name: "test",
		type: "Income",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "test",
		type: "Expense",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const transactionsData = [
	{
		name: "test",
		amount: 10000,
		date: new Date(),
		UserId: 1,
		CategoryId: 1,
		WalletId: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "test2",
		amount: 10000,
		date: new Date(),
		UserId: 1,
		CategoryId: 1,
		WalletId: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const userWalletData = [
	{
		UserId: 1,
		WalletId: 1,
		role: "Owner",
		createdAt: new Date(),
		updatedAt: new Date(),
	}
];

beforeAll(async () => {
	try {
		const user = await queryInterface.bulkInsert("Users", userData);
		const wallet = await queryInterface.bulkInsert("Wallets", walletData);
		const userWallet = await queryInterface.bulkInsert("UserWallets", userWalletData);
		const category = await queryInterface.bulkInsert("Categories", categoryData);
		const transactions = await queryInterface.bulkInsert("Transactions", transactionsData);
	} catch (error) {
		console.log(error);
	}
});

afterAll(async () => {
	try {
		const user = await queryInterface.bulkDelete(
			"Users",
			{},
			{ truncate: true, restartIdentity: true, cascade: true }
		);
		const wallet = await queryInterface.bulkDelete(
			"Wallets",
			{},
			{ truncate: true, restartIdentity: true, cascade: true }
		);
		const userWallet = await queryInterface.bulkDelete(
			"UserWallets",
			{},
			{ truncate: true, restartIdentity: true, cascade: true }
		);
		const category = await queryInterface.bulkDelete(
			"Categories",
			{},
			{ truncate: true, restartIdentity: true, cascade: true }
		);
		const transactions = await queryInterface.bulkDelete(
			"Transactions",
			{},
			{ truncate: true, restartIdentity: true, cascade: true }
		);
	} catch (error) {
		console.log(error);
	}
});

describe("PUT /transactions/:id", () => {
	describe("PUT /transactions/:id - Succes test", () => {
		it("should be return an object message success", async () => {
			const id = 1;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
				UserId: 1,
				WalletId: 1,
			};
			const login = await request(app).post("/users/login").send({ email: "admin@mail.com", password: "admin" });
			access_token = login.body.access_token;
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Succes Edit Transaction with Id " + id);
		});
	});
	describe("PUT /transactions/:id - Transactions not found", () => {
		it("should be return an object message", async () => {
			const id = 100;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
				UserId: 1,
				WalletId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Transaction cannot be found");
		});
	});
	describe("PUT /transactions/:id - not provide input name", () => {
		it("should be return an object message", async () => {
			const id = 1;
			const data = {
				name: "",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
				UserId: 1,
				WalletId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBeInstanceOf(Array);
			expect(response.body.message[0]).toBe("Transaction name is required");
		});
	});
	describe("PUT /transactions/:id - not provide input amount", () => {
		it("should be return an object message", async () => {
			const id = 1;
			const data = {
				name: "updateTest",
				amount: null,
				date: new Date(),
				CategoryId: 1,
				UserId: 1,
				WalletId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBeInstanceOf(Array);
			expect(response.body.message[0]).toBe("Minimum transaction amount is 1");
		});
	});
	describe("PUT /transactions/:id - not provide input date", () => {
		it("should be return an object message", async () => {
			const id = 1;
			const data = {
				name: "updateTest",
				amount: 10000,
				date: null,
				CategoryId: 1,
				UserId: 1,
				WalletId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBeInstanceOf(Array);
			expect(response.body.message[0]).toBe("Transaction date is required");
		});
	});
});

describe("Delete /transactions/:id", () => {
	describe("Delete /transactions/:id - Succes test", () => {
		it("should return a success message", async () => {
			const id = 1;
			const response = await request(app).delete("/transactions/" + id).set("access_token", access_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Success delete Transaction with Id " + id);
		});
	});
	describe("Delete /transactions/:id - Transactions not found", () => {
		it("should return error message", async () => {
			const id = 100;
			const response = await request(app).delete("/transactions/" + id).set("access_token", access_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Transaction cannot be found");
		});
	});
});

describe('GET /transactions success', () => {
	it('Should be return an object', async () => {
		return request(app)
			.get('/transactions')
			.set("access_token", access_token)
			.send({ WalletId: 1 })
			.then(response => {
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Object);
			});
	});
});

describe('POST /transactions success', () => {
	it('Should be return an object', async () => {
		const login = await request(app).post("/users/login").send({ email: "admin@mail.com", password: "admin" });
		access_token = login.body.access_token;
		return request(app)
			.post('/transactions')
			.set("access_token", access_token)
			.send({ name: "test", amount: 1000000, date: new Date(), CategoryId: 1, WalletId: 1 })
			.then(response => {
				expect(response.status).toBe(201);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty('message');
				expect(response.body).toHaveProperty('Transaction');
				expect(response.body).toHaveProperty('Transaction', expect.any(Object));
			});
	});
});

describe('POST /transactions error input field not exist or empty string', () => {
	it("Should be return an object", async () => {
		return request(app)
			.post('/transactions')
			.set("access_token", access_token)
			.send({ WalletId: 1 })
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty('message');
				expect(response.body).toHaveProperty('message', expect.any(Object));
			});
	});
});
