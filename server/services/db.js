//--------------------------------IMPORT---------------------------------
require('dotenv').config(); // read .env file and set environment variables

// Import dependencies
const Pool = require('pg').Pool;

//---------------------------SET UP CONNECTION------------------------------
// Create settings for database connection
const setting = {
    max: 20, // set limit to 20 connections only
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    connectionTimeoutMillis: 3000, // wait 3s to connect a new client before timing out
    ssl      : true
}

// Create a new pool
const pool = new Pool(setting);

// Export the pool for usage elsewhere
module.exports = pool;