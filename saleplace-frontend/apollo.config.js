require('dotenv/config')

module.exports = {
    service: {
        endpoint: {
            url: process.env.GRAPHQL_SCHEMA_URL,
            skipSSLValidation: true
        }
    }
}