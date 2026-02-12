const request = require("supertest");
const app = require("../src/app");

let token;

beforeAll(async () => {
  // login user and store token
  const res = await request(app)
    .post("/api/v1/user/signin")
    .send({
      username: "test25@gmail.com",
      password: "password123",
    });

  token = res.body.token;
});

describe("Money Transfer", () => {

  test("Should fail if balance is insufficient", async () => {
    const res = await request(app)
      .post("/api/v1/account/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        to: "6969d065815c0d3c112baf11",
        amount: 100000,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Insufficient balance");
  });

  test("Should successfully transfer money", async () => {
    const res = await request(app)
      .post("/api/v1/account/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        to: "6969d065815c0d3c112baf11",
        amount: 10,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Transfer successful");
  });

});
