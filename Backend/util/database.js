const Sequelize = require('sequelize');

const sequelize = new Sequelize('online-Super',
'root',
'T14Qu4ntum!!!@@@', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

module.exports = sequelize;
