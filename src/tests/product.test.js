const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Image = require("../models/Image")
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

test("GET /product", async () => {
  const res = await request(app).get("/product");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /product", async () => {
  const category = await Category.create({ name: "test" });
  const body = {
    title: "test title",
    description: "test description",
    brand: "test brand",
    price: 1234,
    categoryId: category.id,
  };
  const res = await request(app)
    .post("/product")
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.headline).toBe(body.headline);
});

test("POST /product/:id/images", async () => {
  const image = await Image.create({
    url: "http://Cualquier-cosa.jpg",
    publicId: "Id",
  });
  const res = await request(app)
    .post(`/product/${id}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /product/:id", async () => {
  const res = await request(app)
    .delete(`/product/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
