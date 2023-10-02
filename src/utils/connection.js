const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {logging: false})
//con esto evitamos los console log al hacer los test y el codigo es mas limpio

module.exports = sequelize;