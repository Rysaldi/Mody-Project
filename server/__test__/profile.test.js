const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

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

		const profiles = require("../data/profile.json");
		profiles.forEach((profile) => {
			delete profile.id;
			profile.createdAt = profile.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Profiles", profiles);
	} catch (error) {
		console.log(error);
	}
});

afterAll(async () => {
	try {
		await queryInterface.bulkDelete(
			"Users",
			{},
			{ truncate: true, cascade: true, restartIdentity: true }
		);
		await queryInterface.bulkDelete(
			"Profiles",
			{},
			{ truncate: true, cascade: true, restartIdentity: true }
		);
	} catch (error) {
		console.log(error);
	}
});

describe("Profiles Routes Test", () => {
	describe("GET /profiles - get profile of user currently logged in", () => {
		test("200 Success read profile - should return an object of profile user logged in", async (done) => {
			const login = await request(app)
				.post("/users/login")
				.send({ email: "admin@mail.com", password: "admin" });
			access_token = login.body.access_token;

			const response = await request(app).get("/profiles").set("access_token", access_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("firstName", expect.any(String));
			expect(response.body).toHaveProperty("lastName", expect.any(String));
			expect(response.body).toHaveProperty("profilePicture", expect.any(String));
			expect(response.body).toHaveProperty("phone", expect.any(String));
			expect(response.body).toHaveProperty("UserId", expect.any(Number));
		});
	});

	describe("GET /profiles - failed because access token is not provided", () => {
		test("401 unauthorized - should return object of error message", async (done) => {
			const response = await request(app).get("/profiles");
			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("PUT /profiles - success edit profile", () => {
		test("200 ok - should return message success edit", async (done) => {
			const response = await request(app).get("/profiles").set("access_token", access_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("PUT /profiles - failed edit profile", () => {
		test("401 ok - should return object of error message", async (done) => {
			const response = await request(app).get("/profiles");
			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
