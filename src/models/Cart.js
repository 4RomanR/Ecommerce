const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    //userId
    //productId
});

//User.prototype.toJSON = function () {
//	const values = { ...this.get() };
//	delete values.password ;
//	return values;
//};
module.exports = Cart;