// Import pool
const pool = require('../server/services/db');

module.exports.selectRoleByCode = async (data) => {
    const SQLSTATEMENT = `
        SELECT * FROM role
        WHERE code = $1;
    `
    const VALUES = [data.code];

    const result = await pool.query(SQLSTATEMENT, VALUES);
    return result.rows[0];
}

module.exports.selectAllRoles = async () => {
    const SQLSTATEMENT = `
        SELECT * FROM role;
    `

    const result = await pool.query(SQLSTATEMENT);
    return result.rows;
}

module.exports.selectAllYearRoles = async () => {
    const SQLSTATEMENT = `
        SELECT * FROM role
        WHERE code IN ('Y1_RID', 'Y2_RID', 'Y3_RID');
    `

    const result = await pool.query(SQLSTATEMENT);
    return result.rows;
}