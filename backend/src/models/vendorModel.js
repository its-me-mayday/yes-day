const { pool } = require('../config/database');

const getVendors = async () => {
  try {
    const res = await pool.query('SELECT * FROM vendors');
    return res.rows;
  } catch (err) {
    console.error('Error fetching vendors', err);
    throw err;
  }
};

const addVendor = async (name, price, paid) => {
  try {
    const query = 'INSERT INTO vendors(name, price, paid) VALUES($1, $2, $3) RETURNING *';
    const values = [name, price, paid];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error adding vendor', err);
    throw err;
  }
};

module.exports = { getVendors, addVendor };