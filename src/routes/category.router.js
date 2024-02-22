const { verify } = require('jsonwebtoken');
const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(verify, getAll)
    .post(verify, create);

routerCategory.route('/:id')
    .delete(verify, remove)

module.exports = routerCategory;