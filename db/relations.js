const Product = require('./Product');
const Sales = require('./Sales');

const dbInit = () => {
    console.log('Running associations')
    Product.hasMany(Sales);
    Sales.belongsTo(Product);
};

module.exports = dbInit;
