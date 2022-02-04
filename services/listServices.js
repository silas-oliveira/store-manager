// const { badRequest } = require('@hapi/boom');
const Joi = require('@hapi/joi');
// const { get } = require('express/lib/response');
const { create,
  productsName,
  getById,
  getAllProducts,
  update,
  delet,
} = require('../models/productRegistration');

// const errorRequired = 400;
const errorLength = 422;
// const userAlready = 409;
// const productNotFound = 404;
// const sucessStatus = 409;

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 5 characters long',
    'string.required': '"name" is required',
  }),
  quantity: Joi.number().min(1).required()
    .messages({
      'number.base': '"quantity" must be a number larger than or equal to 1',
      'number.min': '"quantity" must be a number larger than or equal to 1',
      'number.required': '"quantity" is required',
    }),
  // id: Joi.number().messages({
  //   'number.any': 'Product not found',
  // }),
});

const getStatus = (error) => {
  let defaultState = 400;
  switch (error) {
    case '"name" length must be at least 5 characters long':
      defaultState = errorLength;
      break;
    case '"quantity" must be a number larger than or equal to 1':
      defaultState = errorLength;
      break;
    default:
  }
  return defaultState;
};

const createProduct = async (name, quantity) => {
  // console.log('params', name, quantity);
  // const oshiro = { name, quantity };
  // console.log('oshiro', oshiro);
  const { error } = productSchema.validate({ name, quantity });
  // console.log(error);

  if (error) {
    const objError = { status: getStatus(error.message), message: error.message };
    throw objError;
  }

  //   productsName(name).then((response) => {
  //   const objectError = { status: userAlready, message: 'Product already exists' };
  //    if (response !== []) throw objectError; 
  //  });

  const objectError = { status: 409, message: 'Product already exists' };

  const response = await productsName(name);
  console.log('product Create', response);
  if (response.length !== 0) throw objectError;

  return create(name, quantity).then((result) => {
    // console.log('result create', result);
    const product = { name, quantity, id: result };
    return product;
  });
};

const getProduct = async (id) => {
  const product = await getById(id);

  if (product.length === 0) {
    const objError = { status: 404, message: 'Product not found' };
    throw objError;
  }

  // if (error) {
  //   const objError = { status: 404, message: error.message };
  //   throw objError;
  // }

  const objectProduct = {
    id: product[0].id,
    name: product[0].name,
    quantity: product[0].quantity,
  };

  return objectProduct;
};

const getProducts = async () => {
  const products = await getAllProducts();
  console.log('products', products);

  return products;
};

const updateProduct = async (name, quantity, id) => {
  const { error } = productSchema.validate({ name, quantity });
  if (typeof quantity === 'string') {
    const objError = {
      status: 422, message: '"quantity" must be a number larger than or equal to 1',
    };
    throw objError;
  }
  if (error) {
    const objError = { status: getStatus(error.message), message: error.message };
    throw objError;
  }
  const response = await update(name, quantity, id);
  if (response === 0) {
    const objectError = { status: 404, message: 'Product not found' };
    throw objectError;
  }
  const [infoUpdate] = await getById(id);
  return infoUpdate;
};

const deletProduct = async (id) => {
  const [infoDelete] = await getById(id);
  console.log('id delete', id);
  const req = await delet(id);
  console.log('id service result', req);

  // if (req.affectedRows === 0) {
  //   const objectError = { status: 404, message: 'Product not found' };
  //   throw objectError;
  // }
  return infoDelete;
};

module.exports = {
  createProduct,
  // createList,
  // getProducts,
  getProduct,
  getProducts,
  updateProduct,
  deletProduct,
  productsName,
};
