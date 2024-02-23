const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const { id } = req.params
    const results = await Cart.findAll({
        include:[User, Product],
        where: {userId, productId}
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Cart.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}