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

// const productsList = (id) => {
//   // const query = 'SELECT * FROM products';
//   const queryID = 'SELECT * FROM products WHERE id = ?';

//   // if (!id) {
//   //   return connection.execute(query)
//   //   .then(([rows]) => rows);
//   // }

//   // if (queryID.length === 0) return null;

//   return connection.execute(queryID, [id])
//     .then(([rows]) => console.log(rows));
// };

// const get = async (id) => {
//   // const query = 'SELECT * FROM products';
//   const queryID = 'SELECT * FROM products WHERE id = ?';
//   const [result] = await connection.execute(queryID, [id]);
//   console.log('models result', result);
//   return result;

//   // if (id === undefined) {
//   //   return connection.execute(query)
//   //     .then(([rows]) => rows);
//   // }
//   // return connection.execute(queryID, [id])
//   //   .then(([rows]) => rows);
// };

// const get = async (id) => {
//   const queryID = 'SELECT * FROM products WHERE id = ?';

//   const req = await connection.execute(queryID, [id]);
//   console.log('req', req);
//   return [req];
// };

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [req] = await connection.execute(query, [id]);
  console.log('id', req);
  return req;
};

const getAllProducts = async () => {
  const query = 'SELECT * FROM products';
  const [req] = await connection.execute(query);
  return req;
};

const update = async (name, quantity, id) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

  // connection.execute(query, [name, quantity, id])
  //   .then(([req]) => console.log('req models', req.changedRows));
  const [req] = await connection.execute(query, [name, quantity, id]);
  console.log('req models', req.changedRows);
  return req.changedRows;
};

module.exports = {
  create,
  productsName,
  // productsList,
  getById,
  getAllProducts,
  update,
};