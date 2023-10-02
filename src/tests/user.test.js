const request = require("supertest");
const app = require("../app");

let id; //luego siempre definir el id en post
let token; //crear la variable de token

//ahora para que funcione la validacion de los token:
//crear la variable de token y asignarla en post de /users/login: token = res.body.token;
//colocar los post de primero, el de user y el de /users/login
//luego en los que dejo protegidos en las rutas: ingresar .set("Authorization", `Bearer ${token}`); en el res.

test("POST /users ", async () => {
  const body = {
    firstName: "Alex",
    lastName: "Bohorquez",
    email: "alex@gmail.com",
    password: "alex1234",
    phone: "123456789",
  };
  const res = await request(app).post("/users").send(body);
  id = res.body.id; // aca lo definimos el id para trabajar el delete y el put
  //aca colocamos lo que queremos que valide
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(body.firstName);
  //con esto podemos validar que no aparezca la contraseña
  expect(res.body.password).toBeFalsy();
});
//--------------------------------------------------------------------------------------------------------------------
//test para validar el endpoint de login

test("POST /users/login", async () => {
  const body = {
    email: "alex@gmail.com",
    password: "alex1234",
  };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
  expect(res.body.user).toBeDefined();
});

test("POST /users/login con credenciales invalidas debe retornar error", async () => {
  const body = {
    email: "invalid@gmail.com",
    password: "invalid1234",
  };
  const res = await request(app).post("/users/login").send(body);
  expect(res.status).toBe(401);
});

//---------------------------------------------------------------------
test("GET /users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id", async () => {
  const usersUpdated = {
    firstName: "Bernardo",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .send(usersUpdated)
    .set("Authorization", `Bearer ${token}`);
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(usersUpdated.name);
});

test("DELETE /users/:id", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
