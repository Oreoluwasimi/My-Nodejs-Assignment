const dotenv = require('dotenv');

// Always store sensitive credentials in environment
dotenv.config()

const env = {
    host: process.env.HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}

module.exports = env;
