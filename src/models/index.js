const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const User = require("./User");
const Purchase = require("./Purchase");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);
