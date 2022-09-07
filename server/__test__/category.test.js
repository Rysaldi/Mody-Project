const request = require("supertest");
const app = require("../app");
const { sequelize, Category } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
  try {
    const payload = {
      name: "test",
      type: "test",
    };
    await queryInterface.bulkInsert("Categories", payload);
  } catch (error) {}
});

afterAll(async () => {
  try {
    const payload = {
      name: "test",
      type: "test",
    };
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {}
});

describe("GET /categories", () => {
  describe("GET /categories - success get categories", () => {
    it("Should be return an status 200 and array with data of categories", async () => {
      try {
        const response = await request(app).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toBeInstanceOf(Object);
      } catch (error) {}
    });
  });
});

describe("POST /categories", () => {
  describe("POST /categories - success create category", () => {
    it("Should be return an status 201 and message", () => {
      const payload = {
        name: "test",
        type: "test",
      };
      return request(app)
        .post("/categories")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message");
        });
    });
  });

  describe("POST /categories - failed post category", () => {
    it("Should be return an status 400 and object with message error", () => {
      const payload = {
        name: "",
        type: "test",
      };
      return request(app)
        .post("/categories")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toBeInstanceOf(Object);
        });
    });
    it("Should be return an status 400 and object with message error", () => {
      const payload = {
        name: "test",
        type: "",
      };
      return request(app)
        .post("/categories")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toBeInstanceOf(Object);
        });
    });
  });
});

describe("PUT /categories/:id", () => {
  describe("PUT /categories/:id - success update categories", () => {
    it("Should be return an status 200 and message", () => {
      const payload = {
        name: "test1",
        type: "test1",
      };
      return request(app)
        .put("/categories/1")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("message");
        });
    });
  });

  describe("PUT /categories/:id - failed post category", () => {
    it("Should be return an status 400 and object with message error", () => {
      const payload = {
        name: "",
        type: "test",
      };
      return request(app)
        .put("/categories/1")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toBeInstanceOf(Object);
        });
    });
    it("Should be return an status 400 and object with message error", () => {
      const payload = {
        name: "test",
        type: "",
      };
      return request(app)
        .put("/categories/1")
        .send(payload)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toBeInstanceOf(Object);
        });
    });

    it("Should be return an status 404 and object with message error", () => {
      const payload = {
        name: "test",
        type: "test",
      };
      return request(app)
        .put("/categories/100")
        .send(payload)
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
        const response = await request(app).delete("/categories/1");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      } catch (error) {}
    });
  });

  describe("DELETE /categories:id - failed delete category", () => {
    it("Should be return an status 404 and message", async () => {
      try {
        const response = await request(app).delete("/categories/100");
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
      } catch (error) {}
    });
  });
});
