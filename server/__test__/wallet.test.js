const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");

let user = [
	{
		username: "rysaldi",
		email: "rysaldi@mail.com",
		password: "rysaldi",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		username: "user1",
		email: "user1@mail.com",
		password: "user1",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

let category = [
	{
		name: "Cafe",
		type: "Expense",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Entertainment",
		type: "Expense",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

let wallet = [
	{
		name: "son's wallet",
		totalAmount: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Store's wallet",
		totalAmount: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

let userWallet = [
	{
		UserId: 1,
		WalletId: 1,
		role: "editor",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		UserId: 1,
		WalletId: 1,
		role: "editor",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

let transaction = [
	{
		name: "buy ice cream",
		amount: "10000",
		UserId: 1,
		CategoryId: 1,
		WalletId: 1,
		date: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "buy bakso",
		amount: "10000",
		UserId: 1,
		CategoryId: 1,
		WalletId: 1,
		date: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

beforeAll(() => {
	return queryInterface
		.bulkInsert("Users", user)
		.then(() => {
			return queryInterface.bulkInsert("Categories", category);
		})
		.then(() => {
			return queryInterface.bulkInsert("Wallets", wallet);
		})
		.then(() => {
			return queryInterface.bulkInsert("UserWallets", userWallet);
		})
		.then(() => {
			return queryInterface.bulkInsert("Transactions", transaction);
		})
		.catch((err) => {
			console.log(err);
		});
});

afterAll(() => {
	return queryInterface
		.bulkDelete("Transactions", {}, { truncate: true, restartIdentity: true, cascade: true })
		.then(() => {
			return queryInterface.bulkDelete(
				"UserWallets",
				{},
				{
					truncate: true,
					restartIdentity: true,
					cascade: true,
				}
			);
		})
		.then(() => {
			return queryInterface.bulkDelete(
				"Wallets",
				{},
				{
					truncate: true,
					restartIdentity: true,
					cascade: true,
				}
			);
		})
		.then(() => {
			return queryInterface.bulkDelete(
				"Users",
				{},
				{
					truncate: true,
					restartIdentity: true,
					cascade: true,
				}
			);
		})
		.then(() => {
			return queryInterface.bulkDelete(
				"Categories",
				{},
				{
					truncate: true,
					restartIdentity: true,
					cascade: true,
				}
			);
		});
});

describe("POST /wallets", () => {
	describe("success create wallet", () => {
		it("should return object contains ", async () => {
			const newWallet = { name: "daughter's pocket money" };

			const response = await request(app).post("/wallets").send(newWallet);
			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("name", expect.any(String));
		});
	});

	describe("failed create wallet because name is empty", () => {
		it("should return an error", async () => {
			const newWallet = { name: "" };

			const response = await request(app).post("/wallets").send(newWallet);
			expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBeInstanceOf(Object);
		});
	});

	describe("failed create wallet because name is null", () => {
		it("should return an object of error message", async () => {
			const response = await request(app).post("/wallets").send();
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBeInstanceOf(Object);
		});
	});
});

describe("GET /wallets", () => {
	describe("success read all wallets", () => {
		it("should return array of object ", async () => {
			const response = await request(app).get("/wallets");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body[0]).toHaveProperty("id", expect.any(Number));
			expect(response.body[0]).toHaveProperty("name", expect.any(String));
			expect(response.body[0]).toHaveProperty("totalAmount", expect.any(Number));
		});
	});
});

describe("GET /wallets/:walletId", () => {
	describe("success read detail wallet", () => {
		it("should return object ", async () => {
			const response = await request(app).get("/wallets/1");
			console.log(response.body);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("name", expect.any(String));
			expect(response.body).toHaveProperty("totalAmount", expect.any(Number));
			expect(response.body.UserWallets).toBeInstanceOf(Object);
			expect(response.body.UserWallets[0]).toHaveProperty("UserId", expect.any(Number));
			expect(response.body.UserWallets[0]).toHaveProperty("WalletId", expect.any(Number));
			expect(response.body.UserWallets[0]).toHaveProperty("role", expect.any(String));
			expect(response.body.UserWallets[0].User).toBeInstanceOf(Object);
			expect(response.body.UserWallets[0].User).toHaveProperty("username", expect.any(String));
			expect(response.body.UserWallets[0].User).toHaveProperty("email", expect.any(String));
			expect(response.body.Transactions).toBeInstanceOf(Object);
			expect(response.body.Transactions[0]).toHaveProperty("name", expect.any(String));
			expect(response.body.Transactions[0]).toHaveProperty("amount", expect.any(Number));
			expect(response.body.Transactions[0]).toHaveProperty("date", expect.any(String));
			expect(response.body.Transactions[0].Category).toBeInstanceOf(Object);
			expect(response.body.Transactions[0].Category).toHaveProperty("name", expect.any(String));
			expect(response.body.Transactions[0].Category).toHaveProperty("type", expect.any(String));
		});
	});

	describe("failed read detail wallet because id is not valid", () => {
		it("should return an object of error message ", async () => {
			const response = await request(app).get("/wallets/asd");
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("failed read detail wallet because wallet is not found", () => {
		it("should return an object of error message ", async () => {
			const response = await request(app).get("/wallets/100");
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
