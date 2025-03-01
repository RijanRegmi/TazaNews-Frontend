const pool = require('../config/db');

const createUser = async (name, email, phone, hashedPassword) => {
    const query = `
        INSERT INTO "Users" (name, email, phone, password)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, email, phone, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = `SELECT * FROM "Users" WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
