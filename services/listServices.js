// const { badRequest } = require('@hapi/boom');
const Joi = require('@hapi/joi');
const { create, productsName } = require('../models/productRegistration');

// const errorRequired = 400;
const errorLength = 422;
const userAlready = 409;
// const sucessStatus = 409;

// const nameProducts = (name) => productsName().then((products) => {
//  const productsList = products.map((product) => product.name === name);
//  return productsList;
// });
// console.log('promesses', typeof nameProducts, nameProducts);

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 5 characters long',
    'string.required': '"name" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.required': '"quantity" is required',
  }),
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
  const { error } = productSchema.validate({ name, quantity });
  
  if (error) {
    const objError = { status: getStatus(error.message), message: error.message };
    throw objError;
  }

  //   productsName(name).then((response) => {
  //   const objectError = { status: userAlready, message: 'Product already exists' };
  //    if (response !== []) throw objectError; 
  //  })

  const objectError = { status: userAlready, message: 'Product already exists' };

  const response = await productsName(name);
  if (response !== []) throw objectError;  

  return create(name, quantity).then((result) => {
    const product = { name, quantity, id: result };
    return product;
  });
};

module.exports = {
  createProduct,
};

// create(name, quantity).then((result) => {
//   const product = { name, quantity, id: result };
//   return product;

// const ValidationSchemas = Joi.object({
//   name: Joi.string().min(6).required().messages({
//       "string.empty":"Display name cannot be empty",
//       "string.min":"Min 6 characteers"
//   }).optional(),
//   email: Joi.string().min(6).required().email().message("Must be a valid email address"),
//   password:Joi.string().min(6).required().message("Password is required!")
// })

// const ValidationSchemas = Joi.object({    
//   name: Joi.string()  
//     .min(6)
//     .required()
//     .messages({
//       'string.empty': 'Display name cannot be empty',
//       'string.min': 'Min 6 characteers',
//     })
//     .optional(),
//   email: Joi.string().min(6).required().email().message('Must be a valid email address'),
//   password: Joi.string().required().min(6).message('Password is required!'),
// });