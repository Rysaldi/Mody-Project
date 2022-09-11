const app = require("../app");
const request = require("supertest");
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
	} catch (error) {
		console.log(error);
	}
});

describe("User Routes Test", () => {
	describe("POST /register - create new user", () => {
		test("201 Success register - should create new User", (done) => {
			const newUser = { username: "testing", email: "testing@mail.com", password: "testing" };

			request(app)
				.post("/users/register")
				.send(newUser)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(201);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Success create user");
					expect(body).toHaveProperty("user", expect.any(Object));
					expect(body.user).toHaveProperty("id", expect.any(Number));
					expect(body.user).toHaveProperty("username", newUser.username);
					expect(body.user).toHaveProperty("email", newUser.email);
					return done();
				});
		});

		test("400 Failed register - should return error if username is null", (done) => {
			request(app)
				.post("/users/register")
				.send({
					email: "testing@mail.com",
					password: "testing",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Username is required"]));
					return done();
				});
		});

		test("400 Failed register - should return error if username is empty", (done) => {
			request(app)
				.post("/users/register")
				.send({
					email: "testing@mail.com",
					username: "",
					password: "testing",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Username is required"]));
					return done();
				});
		});

		test("400 Failed register - should return error if password is null", (done) => {
			request(app)
				.post("/users/register")
				.send({
					email: "testing@mail.com",
					username: "testing",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Password is required"]));
					return done();
				});
		});

		test("400 Failed register - should return error if password is empty", (done) => {
			request(app)
				.post("/users/register")
				.send({
					email: "testing@mail.com",
					username: "testing",
					password: "",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty(
						"message",
						expect.arrayContaining([
							"Password is required",
							"Minimum password length is 4 characters",
						])
					);
					return done();
				});
		});

		test("400 Failed register - should return error if email is null", (done) => {
			request(app)
				.post("/users/register")
				.send({
					username: "testing",
					password: "testing",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Email is required"]));
					return done();
				});
		});

		test("400 Failed register - should return error if email is empty", (done) => {
			request(app)
				.post("/users/register")
				.send({
					username: "testing",
					password: "testing",
					email: "",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Email is required"]));
					return done();
				});
		});

		test("400 Failed register - should return error if email is already exists", (done) => {
			request(app)
				.post("/users/register")
				.send({ username: "admin", email: "admin@mail.com", password: "admin" })
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.arrayContaining(["Email already in use"]));
					return done();
				});
		});

		test("400 Failed register - should return error if password length length is no more than 4 characters", (done) => {
			const newUser = { username: "user10", password: "u", email: "user10@mail.com" };
			request(app)
				.post("/users/register")
				.send(newUser)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty(
						"message",
						expect.arrayContaining(["Minimum password length is 4 characters"])
					);
					return done();
				});
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
					access_token = body.access_token;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("access_token", expect.any(String));
					return done();
				});
		});

		test("401 Failed login - should return error when user not found", (done) => {
			request(app)
				.post("/users/login")
				.send({
					email: "testsalah@mail.com",
					password: "salahpassword",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Invalid email/password");
					return done();
				});
		});

		test("401 Failed login - should return error when input password doesnt match password in database", (done) => {
			request(app)
				.post("/users/login")
				.send({
					email: "admin@mail.com",
					password: "user",
				})
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Invalid email/password");
					return done();
				});
		});

		test("400 Failed login - should return error when email doesnt provided", (done) => {
			request(app)
				.post("/users/login")
				.send({ password: "asd" })
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Please check your input");
					return done();
				});
		});

		test("400 Failed login - should return error when password doesnt provided", (done) => {
			request(app)
				.post("/users/login")
				.send({ email: "asd@mail.com" })
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(400);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Please check your input");
					return done();
				});
		});

		test("400 Failed login - should return error when email is not email format", (done) => {
			request(app)
				.post("/users/login")
				.send({ email: "admin", password: "admin" })
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", "Invalid email/password");
					return done();
				});
		});

		test("200 Sucess read all user - should return all user in object", (done) => {
			request(app)
				.get("/users")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body[0]).toHaveProperty("id", expect.any(Number));
					expect(body[0]).toHaveProperty("username", expect.any(String));
					expect(body[0]).toHaveProperty("email", expect.any(String));
					return done();
				});
		});

		test("401 failed read all user - should return error message", (done) => {
			request(app)
				.get("/users")
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		});

		test("200 Sucess read detail - should return data user in object", (done) => {
			request(app)
				.get("/users/1")
				.set("access_token", access_token)
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("id", expect.any(Number));
					expect(body).toHaveProperty("username", expect.any(String));
					expect(body).toHaveProperty("email", expect.any(String));
					return done();
				});
		});

		test("401 failed read detail user - should return error message", (done) => {
			request(app)
				.get("/users/1")
				.end((err, res) => {
					if (err) return done(err);
					const { body, status } = res;

					expect(status).toBe(401);
					expect(body).toEqual(expect.any(Object));
					expect(body).toHaveProperty("message", expect.any(String));
					return done();
				});
		});
	});
});
