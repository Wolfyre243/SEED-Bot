// Import pool
const pool = require('../server/services/db');

module.exports.selectChannelByCode = async (data) => {
    const SQLSTATEMENT = `
        SELECT * FROM channel
        WHERE code = $1;
    `
    const VALUES = [data.code];

    const result = await pool.query(SQLSTATEMENT, VALUES);
    return result.rows[0];
}

module.exports.selectAllChannels = async () => {
    const SQLSTATEMENT = `
        SELECT * FROM channel;
    `

    const result = await pool.query(SQLSTATEMENT);
    return result.rows;
}