const { Sequelize, DataTypes, Model } = require('sequelize');
const Product = require('./Product');
const sequelize = require('./sequelize');

/*
  what is mean?
  what is range?
 */

const ProductSales = sequelize.define('ProductSales', {
    quantitySold: {
        type: DataTypes.NUMBER,
        default: 0
    },

    totalAmountSold: {
        type: DataTypes.NUMBER
    }
});

ProductSales.belongsTo(Product)


