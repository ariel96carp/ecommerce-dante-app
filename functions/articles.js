const articles = require('../data/articles')

exports.handler = async (event) => {
    switch(event.httpMethod) {
        case 'GET':
            return {
                statusCode: 200,
                body: JSON.stringify(articles)
            }
        default:
            return {
                statusCode: 405,
                body: { }
            }
    }
}
