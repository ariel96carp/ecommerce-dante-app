const products = require('../data/products')

exports.handler = async (event) => {
    switch(event.httpMethod) {
        case 'GET':
            return {
                statusCode: 200,
                body: JSON.stringify(products)
            }
        default:
            return {
                statusCode: 405,
                body: { }
            }
    }
}
