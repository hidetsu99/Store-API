const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({

    })
    res.status(200).json({nbHits: products.length, products})
}
const getAllProducts = async (req, res) => {
    const { featured } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
        console.log(queryObject);
    }
    const products = await Product.find(queryObject)
    res.status(200).json({nbHits: products.length, products})
}
// 4:09 filtro de company and name via query
module.exports = {
    getAllProducts,
    getAllProductsStatic
}