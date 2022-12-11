const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize');

/*
  Hash timestamps createdAt will denote dateSold
 */
const Sales = sequelize.define('Sales', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        priceSold: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }, {
        timestamps: true
});

module.exports = Sales;
