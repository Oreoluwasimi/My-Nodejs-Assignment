const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize');
const Sales = require('./Sales');

/*
 fields; product, product Id, quantity sold, date sold, total amount sold, mean, max, range.
 */

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Product;
