// Import pool
const pool = require('../services/db');

// -----------------------------------MODEL--------------------------------------
// Read all configs from the database.
module.exports.selectAllChannels = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM channel;  
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectAllRoles = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM role;  
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectAllRoles = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM role;  
    `;

    pool.query(SQLSTATEMENT, callback);
}