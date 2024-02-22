const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    }
});

//User.prototype.toJSON = function () {
//	const values = { ...this.get() };
//	delete values.password ;
//	return values;
//};
module.exports = Category;