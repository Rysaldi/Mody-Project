const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

const userTest = {
  email: "test@mail.com",
  username: "testoo",
  password: "test",
};

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User Routes Test", () => {
  describe("POST /register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/users/register")
        .send(userTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "Success create user");
          expect(body).toHaveProperty("user", expect.any(Object));
          expect(body.user).toHaveProperty("id", expect.any(Number));
          expect(body.user).toHaveProperty("username", userTest.username);
          expect(body.user).toHaveProperty("email", userTest.email);
          return done();
        });
    });

    test("400 Failed register - should return error if username is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "test@mail.com",
          password: "12345",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty(
            "message",
            expect.arrayContaining(["Username is required"])
          );
          return done();
        });
    });
    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "test",
          password: "12345",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty(
            "message",
            expect.arrayContaining(["Email is required"])
          );
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/users/register")
        .send(userTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty(
            "message",
            expect.arrayContaining(["Email already in use"])
          );
          return done();
        });
    });
  });

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/users/login")
        .send(userTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

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
  });
});
