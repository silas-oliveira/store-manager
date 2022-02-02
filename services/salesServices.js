const { products, sales } = require('../models/productsSales');

const validateProductId = (reqBody) => {
  const test = reqBody.some((sale) => sale.product_id);
  if (!test) {
    const errorBody = { status: 400, message: '"product_id" is required' };
    throw errorBody;
  }
  return test;
};

const validateQuantity = (reqBody) => {
  const test = reqBody.forEach((sale) => {
    if (sale.quantity === undefined) {
      const testRequired = { status: 400, message: '"quantity" is required' };
      throw testRequired;
    }
    if (typeof sale.quantity === 'string' || sale.quantity < 1 || sale.quantity === 0) {
      const testNumber = { status: 422,
        message: '"quantity" must be a number larger than or equal to 1' };
      throw testNumber;
    }
  });
  return test; 
};

const salesProduct = async (reqBody) => {
  validateProductId(reqBody);
  validateQuantity(reqBody);
 
  const insertId = await sales(new Date());

  const req = await reqBody.map(async (product) => {
      await products(insertId, product.product_id, product.quantity);
  });
  await Promise.all(req);

  return insertId;
};

module.exports = {
  salesProduct,
};