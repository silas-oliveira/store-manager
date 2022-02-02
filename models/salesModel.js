const connection = require('./connection');

const list = async () => {
  const query = `SELECT sale_id AS saleId, date, product_id,
  quantity FROM sales INNER JOIN sales_products ON sales.id = sale_id`;

  const [req] = await connection.execute(query);
  return req;
};

const salesId = async (id) => {
  const query = `SELECT date, product_id, quantity FROM sales
  INNER JOIN sales_products ON 
  sales.id = sales_products.sale_id WHERE sales.id = ?`;

  const [req] = await connection.execute(query, [id]);
  console.log('model', req);
  return req;
};
module.exports = {
  list,
  salesId,
};