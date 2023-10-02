const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");

const getAll = catchError(async (req, res) => {
  //ahora para acceder al usuario logueado
  const userId = req.user.id;
  const purchases = await Purchase.findAll({
    where: { userId },
  });
  return res.json(purchases);
});

const create = catchError(async (req, res) => {
  const userId = req.user.id;
  const carts = await Cart.findAll({
    where: { userId },
    attributes: ["userId", "productId", "quantity"],
    raw: true,
  });
  const purchases = await Purchase.bulkCreate(carts);
  //ahora eliminamos la compra una ves realizada
  //siempre un delete trae un where para asegurar que quiere borrar y no borrar todo
  //en este caso solo se elimina de ese usuario que compro
  await Cart.destroy({where: {userId}});
  return res.status(201).json(purchases);
});

module.exports = {
  getAll,
  create,
};