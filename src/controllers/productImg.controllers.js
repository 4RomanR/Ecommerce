const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path');
const fs = require('fs')
const upload = require('../utils/multer');


const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { filename } = req.file
    //console.log(filename)

    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    console.log(req.headers.host)

    const newBody = { filename, url }
    const result = await ProductImg.create(newBody)
    if(!result) return res.sendStatus(404)
    
    return res.status(201).json(result)
})

const remove = catchError(async (req, res) => {
    const { id } = req.params
    const result = await ProductImg.findByPk(id)
    if(!result) return res.sendStatus(404)
    
    const imageFilePath = path.join(__dirname, "..", "public", 'uploads', `${result.filename}`);

    fs.unlinkSync(imageFilePath)

    await result.destroy()
    return res.sendStatus(204)
})

module.exports = {
    getAll,
    create,
    remove
}