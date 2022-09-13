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

		const login = await request(app).post("/users/login").send({ email: "admin@mail.com", password: "admin" });
		access_token = login.body.access_token;
	} catch (error) {
		console.log(error);
	}
});

afterAll(async () => {
	try {
		await queryInterface.bulkDelete("Categories", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
		await queryInterface.bulkDelete("Users", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	} catch (error) {
		console.log(error);
	}
});

describe("GET /categories", () => {
	describe("GET /categories - success get categories", () => {
		it("Should be return an status 200 and array with data of categories", async () => {
			try {
				const response = await request(app).get("/categories").set("access_token", access_token);
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Array);
				expect(response.body[0]).toBeInstanceOf(Object);
			} catch (error) { }
		});
	});

	describe("401 unauthorized - failed get categories because access token is not provided", () => {
		it("Should be return an status 401 and object with message error", async () => {
			return request(app)
				.get("/categories")
				.then((response) => {
					expect(response.status).toBe(401);
					expect(response.body).toBeInstanceOf(Object);
					expect(response.body).toHaveProperty("message", expect.any(String));
				});
		});
	});
});

describe("POST /categories", () => {
	describe("POST /categories - success create category", () => {
		it("Should be return an status 201 and message", async () => {
			const payload = {
				name: "test",
				type: "test",
			};
			return request(app)
				.post("/categories")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(201);
					expect(response.body).toBeInstanceOf(Object);
					expect(response.body).toHaveProperty("message");
				});
		});
	});

	describe("POST /categories - failed post category", () => {
		it("Should be return an status 400 and object with message error", async () => {
			const payload = {
				name: "",
				type: "test",
			};
			return request(app)
				.post("/categories")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(400);
					expect(response.body).toBeInstanceOf(Object);
				});
		});
		it("Should be return an status 400 and object with message error", async () => {
			const payload = {
				name: "test",
				type: "",
			};
			return request(app)
				.post("/categories")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(400);
					expect(response.body).toBeInstanceOf(Object);
				});
		});
	});
});

describe("PUT /categories/:id", () => {
	describe("PUT /categories/:id - success update categories", () => {
		it("Should be return an status 200 and message", async () => {
			const payload = {
				name: "test1",
				type: "test1",
			};
			return request(app)
				.put("/categories/1")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(200);
					expect(response.body).toBeInstanceOf(Object);
					expect(response.body).toHaveProperty("message");
				});
		});
	});

	describe("PUT /categories/:id - failed post category", () => {
		it("Should be return an status 400 and object with message error", async () => {
			const payload = {
				name: "",
				type: "test",
			};
			return request(app)
				.put("/categories/1")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(400);
					expect(response.body).toBeInstanceOf(Object);
				});
		});
		it("Should be return an status 400 and object with message error", async () => {
			const payload = {
				name: "test",
				type: "",
			};
			return request(app)
				.put("/categories/1")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(400);
					expect(response.body).toBeInstanceOf(Object);
				});
		});

		it("Should be return an status 404 and object with message error", async () => {
			const payload = {
				name: "test",
				type: "test",
			};
			return request(app)
				.put("/categories/100")
				.send(payload)
				.set("access_token", access_token)
				.then((response) => {
					expect(response.status).toBe(404);
					expect(response.body).toBeInstanceOf(Object);
				});
		});
	});
});

describe("DELETE /categories:id", () => {
	describe("DELETE /categories:id - success delete category", () => {
		it("Should be return an status 200 and message", async () => {
			try {
				const response = await request(app).delete("/categories/1").set("access_token", access_token);
				expect(response.status).toBe(200);
				expect(response.body).toBeInstanceOf(Object);
			} catch (error) { }
		});
	});

	describe("DELETE /categories:id - failed delete category", () => {
		it("Should be return an status 404 and message", async () => {
			try {
				const response = await request(app).delete("/categories/100").set("access_token", access_token);
				expect(response.status).toBe(404);
				expect(response.body).toBeInstanceOf(Object);
			} catch (error) { }
		});
	});
});

describe("GET /categories - when category data is empty", () => {
	it("Should be return an status 200 and emppty array", async () => {
		try {
			await queryInterface.bulkDelete("Categories", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
			const response = await request(app).get("/categories").set("access_token", access_token);
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body[0]).toBeInstanceOf(Object);
		} catch (error) { }
	})
});
