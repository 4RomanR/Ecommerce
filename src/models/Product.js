const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    description: {
        type: DataTypes.TEXT
         
    },
    price: {
        type: DataTypes.DECIMAL,
        
    },
    //categoryId
});


module.exports = Product;