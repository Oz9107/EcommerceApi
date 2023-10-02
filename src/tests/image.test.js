const app = require("../app"); // Asegúrate de que esta sea la ubicación correcta de tu aplicación
const request = require("supertest");

let token;
let id;

test("GET /images", async () => {
  const res = await request(app)
    .get("/product_images")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});