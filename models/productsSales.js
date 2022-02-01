const connection = require('./connection');

const products = async (insertId, productId, quantity) => {
  console.log(productId, quantity);
  // const saleID = 1;
  // console.log('saleID', saleId);
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

  // const query2 = 'SELECT id FROM products WHERE id = ?';

  // const query3 = 'SELECT id FROM sales WHERE id = ?';
  // const [req3] = await connection.execute(query3, [saleId]);
  // const [req2] = await connection.execute(query2, [saleID]);
  // console.log('req2', req2[0]);
  
  // if (req2.insertId === saleId) {
  //    return req2.insertId + 1;
  // }
  
  const [req] = await connection.execute(query, [insertId, productId, quantity]);
  console.log('req models');

  // if (req2 === req2) {
  //   return
  // }
  
  // const product = {
  //   req,
  //   req2,
  // };

  return req;
};

const sales = async (date) => {
  const query = 'INSERT INTO sales (date) VALUES (?)';

  const [req] = await connection.execute(query, [date]);
  console.log('models req', req);
  return req.insertId;
};

// const sales = async () => {

// ); 

// };

module.exports = {
  products,
  sales,
};