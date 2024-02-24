const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
         
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    //categoryId
});

//User.prototype.toJSON = function () {
//	const values = { ...this.get() };
//	delete values.password ;
//	return values;
//};
module.exports = Product;