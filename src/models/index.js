const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

Product.belongsTo(Category) // -> Product -> categoryId
Category.hasMany(Product)
//userId
Cart.belongsTo(User)
User.hasMany(Cart)

//ProductId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//ProductId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)
