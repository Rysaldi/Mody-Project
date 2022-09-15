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

describe("POST /login - user login", () => {
	test("200 Success login - should return access_token", (done) => {
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
	}, 10000);
});

describe("UserWallets routes test", () => {
	describe("GET /userWallets - success get all userwallets", () => {
		test("200 Success get - should return an array of object contain list of userwallet", (done) => {
			request(app)
				.get("/userWallets")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body[0]).toHaveProperty("id", expect.any(Number));
					expect(body[0]).toHaveProperty("UserId", expect.any(Number));
					expect(body[0]).toHaveProperty("WalletId", expect.any(Number));
					expect(body[0]).toHaveProperty("role", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("GET /userWallets - failed get all userwallets", () => {
		test("401 Unauthorized - should return an error if access token is not provided", (done) => {
			request(app)
				.get("/userWallets")
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("POST /userWallets - success create new userwallets", () => {
		test("201 OK - should return success message", async () => {
			const response = await request(app).post("/userWallets")
				.send({ UserId: 2, WalletId: 1, role: "Member", email: "rohmat@mail.com" })
				.set("access_token", access_token);
			expect(response.status).toBe(201);
			expect(response.body).toEqual(expect.any(Object));
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("UserId", expect.any(Number));
			expect(response.body).toHaveProperty("WalletId", expect.any(Number));
			expect(response.body).toHaveProperty("role", expect.any(String));
		}, 10000);
	});

	describe("POST /userWallets - success create new userwallets", () => {
		test("201 OK - should return success message", async () => {
			const response = await request(app).post("/userWallets")
				.send({ UserId: 2, WalletId: 1, role: "Member", email: "user2@mail.com" })
				.set("access_token", access_token);
			expect(response.status).toBe(400);
			expect(response.body).toEqual(expect.any(Object));
		}, 10000);
	});


	describe("POST /userWallets - failed create new userwallets", () => {
		test("404 Not Found - should return an error if wallet is not found", (done) => {
			request(app)
				.post("/userWallets")
				.send({ role: "Manager", WalletId: 10, UserId: 2, email: "sahedTamvan@mail.com" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(404);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("POST /userWallets - failed create new userwallets", () => {
		test("400 Bad Request - should return an error if email is not provided", (done) => {
			request(app)
				.post("/userWallets")
				.send({ WalletId: 1, role: "Member" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("POST /userWallets - failed create new userwallets", () => {
		test("400 Bad Request - should return an error if role is not provided", (done) => {
			request(app)
				.post("/userWallets")
				.send({ WalletId: 1, email: "user1@mail.com" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("POST /userWallets - failed create new userwallets", () => {
		test("400 Bad Request - should return an error if wallet is not provided", (done) => {
			request(app)
				.post("/userWallets")
				.send({ role: "Member", email: "user1@mail.com" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("PUT /userWallets - success edit userwallets", () => {
		test("200 OK - should return an object of success message", (done) => {
			request(app)
				.put("/userWallets/2")
				.send({ UserId: 2, role: "Member" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("PUT /userWallets - failed edit userwallets", () => {
		test("400 Bad request - should return an error if user id is not provided", (done) => {
			request(app)
				.put("/userWallets/2")
				.send({ role: "Member" })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("PUT /userWallets - failed edit userwallets", () => {
		test("400 Bad request - should return an error if role is not provided", (done) => {
			request(app)
				.put("/userWallets/2")
				.send({ UserId: 2 })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("PUT /userWallets - failed edit userwallets", () => {
		test("401 Unauthorized - should return an error if access token not provided", (done) => {
			request(app)
				.put("/userWallets/2")
				.send({ role: "Member", UserId: 2 })
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("PUT /userWallets - failed edit userwallets", () => {
		test("404 Not Found - should return an error if data is not found", (done) => {
			request(app)
				.put("/userWallets/100")
				.send({ role: "Manager", UserId: 2 })
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(404);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("DELETE /userWallets - success delete userwallets", () => {
		test("200 OK - should return success message", (done) => {
			request(app)
				.delete("/userWallets/1")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("DELETE /userWallets - failed delete userwallets", () => {
		test("404 Not Found - should return error message", (done) => {
			request(app)
				.delete("/userWallets/10")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(404);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("DELETE /userWallets - failed delete userwallets", () => {
		test("401 Unauthorized - should return error message", (done) => {
			request(app)
				.delete("/userWallets/10")
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});

	describe("DELETE /userWallets - failed delete userwallets", () => {
		test("400 Bad Request - should return error message", (done) => {
			request(app)
				.delete("/userWallets/asd")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		}, 10000);
	});
});
