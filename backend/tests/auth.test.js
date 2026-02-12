const request = require("supertest");
const app = require("../src/app");

describe("Health Check", () => {
  test("Server should be running", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});
