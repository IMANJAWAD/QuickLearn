const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', //enter ur password pleaseeeeee 
  database: 'QuickLearnDatabase'
});

const query = (sql, values, callback) => {
  pool.query(sql, values, callback);
};

module.exports = { query };
