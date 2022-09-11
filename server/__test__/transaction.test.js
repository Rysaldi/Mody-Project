const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

let access_token;

beforeAll(async () => {
	try {
		const users = require("../data/user.json");
		users.forEach((user) => {
			delete user.id;
			user.createdAt = user.updatedAt = new Date();
			user.password = hashPassword(user.password);
		});
		await queryInterface.bulkInsert("Users", users);

		const categories = require("../data/categories.json");
		categories.forEach((category) => {
			delete category.id;
			category.createdAt = category.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Categories", categories);

		const wallets = require("../data/wallet.json");
		wallets.forEach((wallet) => {
			delete wallet.id;
			wallet.createdAt = wallet.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Wallets", wallets);

		const transactions = require("../data/transaction.json");
		transactions.forEach((transaction) => {
			delete transaction.id;
			transaction.createdAt = transaction.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Transactions", transactions);

		const userWallets = require("../data/userWallet.json");
		userWallets.forEach((userWallet) => {
			delete userWallet.id;
			userWallet.createdAt = userWallet.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("UserWallets", userWallets);
	} catch (error) {
		console.log(error);
	}
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
		})
		.then(() => {
			return queryInterface.bulkDelete(
				"Transactions",
				{},
				{
					truncate: true,
					restartIdentity: true,
					cascade: true,
				}
			);
		});
});

describe("PUT /transactions/:id", () => {
	describe("PUT /transactions/:id - Succes test", () => {
		it("should be return an object message success", async () => {
			const id = 6;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
				WalletId: 1,
				description: "",
				photo: "",
			};
			const login = await request(app)
				.post("/users/login")
				.send({ email: "admin@mail.com", password: "admin" });
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
	describe("PUT /transactions/:id - invalid access token", () => {
		it("should be return an object message", async () => {
			const id = 6;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyNzgzNjE4fQ.bxkcmVaqDa430W_Hqo4w1zMNF2E5vUy_wUvQImfEmiZ")
				.send(data);
			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Invalid token");
		});
	});
	describe("PUT /transactions/:id - User Wallet not found", () => {
		it("should be return an object message", async () => {
			const id = 1;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Forbidden");
		});
	});
	describe("PUT /transactions/:id - unauthorized", () => {
		it("should be return an object message", async () => {
			const id = 1;
			const data = {
				name: "updateTest",
				amount: 2000,
				date: new Date(),
				CategoryId: 1,
				WalletId: 1,
			};
			const response = await request(app)
				.put("/transactions/" + id)
				.set("access_token", access_token)
				.send(data);
			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Forbidden");
		});
	});
	describe("PUT /transactions/:id - not provide input name", () => {
		it("should be return an object message", async () => {
			const id = 6;
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
			const id = 6;
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
			const id = 6;
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
			const id = 6;
			const response = await request(app)
				.delete("/transactions/" + id)
				.set("access_token", access_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Success delete Transaction with Id " + id);
		});
	});
	describe("Delete /transactions/:id - Transactions not found", () => {
		it("should return error message", async () => {
			const id = 100;
			const response = await request(app)
				.delete("/transactions/" + id)
				.set("access_token", access_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBe("Transaction cannot be found");
		});
	});
});

describe("GET /transactions success", () => {
	it("Should be return an object", async () => {
		return request(app)
			.get("/transactions")
			.set("access_token", access_token)
			.send({ WalletId: 1 })
			.then((response) => {
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Object);
			});
	});
});

describe("POST /transactions success", () => {
	it("Should be return an object", async () => {
		const login = await request(app)
			.post("/users/login")
			.send({ email: "admin@mail.com", password: "admin" });
		access_token = login.body.access_token;
		return request(app)
			.post("/transactions")
			.set("access_token", access_token)
			.send({ name: "test", amount: 1000000, date: new Date(), CategoryId: 1, WalletId: 1 })
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message");
				expect(response.body).toHaveProperty("Transaction");
				expect(response.body).toHaveProperty("Transaction", expect.any(Object));
			});
	});
});

describe("POST /transactions error input field not exist or empty string", () => {
	it("Should be return an object", async () => {
		return request(app)
			.post("/transactions")
			.set("access_token", access_token)
			.send({ WalletId: 1 })
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message");
				expect(response.body).toHaveProperty("message", expect.any(Object));
			});
	});
});
