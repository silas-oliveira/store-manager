const Joi = require('@hapi/joi');
const { products, sales } = require('../models/productsSales');

const errorLength = 422;

const productSchema = Joi.object({
  productId: Joi.number().integer().required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 5 characters long',
    'string.required': '"name" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
    'string.base': '"name" must be a string',
    'string.min': '"quantity" must be a number larger than or equal to 1',
    'string.required': '"name" is required',
  }),
  // id: Joi.number().messages({
    //   'number.any': 'Product not found',
    // }),
  });

  const getStatus = (error) => {
    let defaultState = 400;
    switch (error) {
        case '"quantity" must be a number larger than or equal to 1':
          defaultState = errorLength;
          break;
          default:
          }
          return defaultState;
        };

const salesProduct = async (reqBody) => {
  const { error } = productSchema.validate(reqBody.product_id, reqBody.quantity);
  if (error) {
    const objError = { status: getStatus(error), message: error.message };
    throw objError;
  }
  const insertId = await sales(new Date());
  if (reqBody[0].quantity === undefined) {
    const errorBody = { status: 400, message: '"quantity" is required' };
    throw errorBody;
  } if (reqBody[0].product_id === undefined) {
    const errorBody = { status: 400, message: '"product_id" is required' };
    throw errorBody;
  }
  const req = await reqBody.map(async (product) => {
    await products(insertId, product.product_id, product.quantity);
  });
  await Promise.all(req);
  return insertId;
};

module.exports = {
  salesProduct,
};