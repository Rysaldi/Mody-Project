const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const app = require("../app");
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

describe("POST /login - user login", () => {
	test("200 Success login - should return access_token", (done) => {
		jest.setTimeout(10000);
		request(app)
			.post("/users/login")
			.send({ email: "admin@mail.com", password: "admin" })
			.end((err, res) => {
				if (err) return done(err);
				const { body, status } = res;

				expect(status).toBe(200);
				expect(body).toEqual(expect.any(Object));
				expect(body).toHaveProperty("access_token", expect.any(String));
				access_token = body.access_token;
				return done();
			});
	});
});

describe("POST /wallets", () => {
	describe("success create wallet", () => {
		it("should return object contains ", async () => {
			jest.setTimeout(10000);
			const newWallet = { name: "daughter's pocket money" };

			const response = await request(app)
				.post("/wallets")
				.send(newWallet)
				.set("access_token", access_token);
			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("name", expect.any(String));
		});
	});

	describe("failed create wallet because name is empty", () => {
		it("should return an error", async () => {
			jest.setTimeout(10000);
			const newWallet = { name: "" };

			const response = await request(app)
				.post("/wallets")
				.send(newWallet)
				.set("access_token", access_token);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body.message).toBeInstanceOf(Object);
		});
	});

	describe("failed create wallet because name is null", () => {
		it("should return an object of error message", async () => {
			jest.setTimeout(10000);
			const response = await request(app).post("/wallets").send().set("access_token", access_token);
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
			jest.setTimeout(10000);
			const response = await request(app).get("/wallets").set("access_token", access_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body[0]).toHaveProperty("id", expect.any(Number));
			expect(response.body[0]).toHaveProperty("name", expect.any(String));
			expect(response.body[0]).toHaveProperty("balance", expect.any(Number));
		});
	});
});

describe("GET /wallets/:walletId", () => {
	describe("success read detail wallet", () => {
		it("should return object ", async () => {
			jest.setTimeout(10000);
			const response = await request(app).get("/wallets/1").set("access_token", access_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("name", expect.any(String));
			expect(response.body).toHaveProperty("balance", expect.any(Number));
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
			jest.setTimeout(10000);
			const response = await request(app).get("/wallets/asd").set("access_token", access_token);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("failed read detail wallet because wallet is not found", () => {
		it("should return an object of error message ", async () => {
			jest.setTimeout(10000);
			const response = await request(app).get("/wallets/100").set("access_token", access_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("DELETE /wallets/:walletId", () => {
	describe("Wallet deletion successful", () => {
		jest.setTimeout(10000);
		it("Should be return an status 200 and message", async () => {
			try {
				const response = await request(app).delete("/wallets/1").set("access_token", access_token);
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message", expect.any(String));
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe("Wallet deletion failed because wallet not found", () => {
		it("Should be return an status 404 and message", async () => {
			jest.setTimeout(10000);
			try {
				const response = await request(app)
					.delete("/wallets/100")
					.set("access_token", access_token);
				expect(response.status).toBe(404);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message", expect.any(String));
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe("Wallet deletion failed because role is not owner", () => {
		it("Should be return an status 403 and message", async () => {
			jest.setTimeout(10000);
			try {
				const response = await request(app).delete("/wallets/2").set("access_token", access_token);
				expect(response.status).toBe(403);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message", expect.any(String));
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe("Wallet deletion failed because wallet Id is not a number", () => {
		it("Should be return an status 400 and message", async () => {
			jest.setTimeout(10000);
			try {
				const response = await request(app)
					.delete("/wallets/stringhere")
					.set("access_token", access_token);
				expect(response.status).toBe(400);
				expect(response.body).toBeInstanceOf(Object);
				expect(response.body).toHaveProperty("message", expect.any(String));
			} catch (error) {
				console.log(error);
			}
		});
	});
});

describe("PUT /wallets/:walletId", () => {
	describe("Success update Wallet", () => {
		it("Should return a status 200 and message", async () => {
			jest.setTimeout(10000);
			try {
				const walletInputUpdate = {
					name: "test1",
				};
				return request(app)
					.put("/wallets/1")
					.send(walletInputUpdate)
					.set("access_token", access_token)
					.then((response) => {
						expect(response.status).toBe(200);
						expect(response.body).toBeInstanceOf(Object);
						expect(response.body).toHaveProperty("message", expect.any(String));
					});
			} catch (error) {
				console.log(error);
			}
		});
	});
	describe("Failed update wallet because wallet name is empty", () => {
		it("Should return a status 400 and message", async () => {
			jest.setTimeout(10000);
			try {
				const walletInputUpdate = {
					name: "",
				};
				return request(app)
					.put("/wallets/1")
					.send(walletInputUpdate)
					.set("access_token", access_token)
					.then((response) => {
						expect(response.status).toBe(400);
						expect(response.body).toBeInstanceOf(Object);
					});
			} catch (error) {
				console.log(error);
			}
		});
	});
	describe("Failed update wallet because wallet name is null", () => {
		it("Should return a status 400 and message", async () => {
			jest.setTimeout(10000);
			try {
				return request(app)
					.put("/wallets/1")
					.send()
					.set("access_token", access_token)
					.then((response) => {
						expect(response.status).toBe(400);
						expect(response.body).toBeInstanceOf(Object);
						expect(response.body).toHaveProperty("message", expect.any(String));
					});
			} catch (error) {
				console.log(error);
			}
		});
	});
});
