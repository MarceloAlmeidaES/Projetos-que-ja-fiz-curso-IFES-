const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './fornecedor.sqlite'
})
module.exports = sequelize;