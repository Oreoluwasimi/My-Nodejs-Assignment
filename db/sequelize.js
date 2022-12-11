const { Sequelize } = require('sequelize');
const env = require('../environment');

/*
   see doc here https://sequelize.org/docs/v6/getting-started/
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

module.exports = sequelize;
