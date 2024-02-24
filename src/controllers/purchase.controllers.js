const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [User, Product]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Purchase.create(req.body);
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create
}