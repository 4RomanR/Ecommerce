const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Product.belongsTo(Category) // -> Product -> categoryId
Category.hasMany(Product)