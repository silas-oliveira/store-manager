const connection = require('./connection');

const productsName = (name) => {
  const query = 'SELECT name FROM products WHERE name = ?';

  return connection.execute(query, [name])
    .then(([rows]) => rows);
};

const create = (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) values (?, ?)';

  return connection.execute(query, [name, quantity])
    .then(([rows]) => rows.insertId);
};

module.exports = {
  create,
  productsName,
};