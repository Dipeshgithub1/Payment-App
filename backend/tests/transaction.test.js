const request = require("supertest");
const app = require("../src/app");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/v1/user/signin")
    .send({
      username: "test25@gmail.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();

  token = res.body.token;
});

describe("Transfer History API", () => {

  test("Should return paginated transaction history", async () => {
    const res = await request(app)
      .get("/api/v1/transaction?page=1&limit=5")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("transactions");
    expect(res.body.transactions).toBeInstanceOf(Array);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(5);

    if (res.body.transactions.length > 0) {
      expect(res.body.transactions[0]).toHaveProperty("amount");
      expect(res.body.transactions[0]).toHaveProperty("type");
      expect(res.body.transactions[0]).toHaveProperty("createdAt");
    }
  });

  test("Should fail without authentication", async () => {
    const res = await request(app)
      .get("/api/v1/transaction?page=1&limit=5");

    expect(res.statusCode).toBe(401);
  });

});
