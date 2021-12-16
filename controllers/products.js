const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const search = 'f'
    const {limit, page} = req.query
    let results = Product.find({})
    // if (limit) {
    //     results = results.limit(Number(limit))
    //     console.log(results);
    // }
    // if (page) {
    //     results = results
    //     .skip(limit 
    //         ? limit*Number(page -1 ) 
    //         : results.length*Number(page - 1))
    // }
    const products = await results
    res.status(200).json({nbHits: products.length, products})
}
const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilter } = req.query
    const queryObject = {}
    
    // Sort by featured, company, name
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
        console.log(queryObject);
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    //Field only show
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    // Limit and pagination
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)    
    //Show products
    const products = await result
    res.status(200).json({nbHits: products.length, products})
}
// 4:09 filtro de company and name via query
module.exports = {
    getAllProducts,
    getAllProductsStatic
}