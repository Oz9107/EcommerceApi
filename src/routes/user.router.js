const {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
} = require("../controllers/user.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");


const userRouter = express.Router();

userRouter.route("/").get(verifyJWT, getAll).post(create);// con verifyJWT protegemos las rutas

userRouter.route("/login").post(login);

userRouter
  .route("/:id")
  .get(verifyJWT, getOne) // con verifyJWT protegemos las rutas
  .delete(verifyJWT, remove) // con verifyJWT protegemos las rutas
  .put(verifyJWT, update);// con verifyJWT protegemos las rutas
module.exports = userRouter;
