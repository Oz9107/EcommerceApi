const app = require("../app");
const request = require("supertest");
require("../models");

let token;
let id;

beforeAll(async () => {
  const body = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
});

test("GET /cart", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("GET /cart/:id", async () => {
  const validCartId = 1;
  const res = await request(app)
    .get(`/cart/${validCartId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("POST /cart", async () => {
  const body = { quantity: "5" };
  const res = await request(app)
  .post("/cart")
  .send(body)
  .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.rate).toBe(body.rate);
});
test("PUT /cart/:id", async () => {
  const validCartId = 1;
  const updatedQuantity = 10;
  const res = await request(app)
    .put(`/cart/${validCartId}`)
    .send({ quantity: updatedQuantity })
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(updatedQuantity);
});

test("DELETE /cart/:id", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  console.log(res.body);
  expect(res.status).toBe(204);
});
