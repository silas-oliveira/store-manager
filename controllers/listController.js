const { createProduct, getProduct, getProducts } = require('../services/listServices');

const createNewProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  return createProduct(name, quantity)
    .then((response) => {
      res.status(201).json(response);
    })
      .catch((error) => next(error));
};

// const getListOrId = (req, res, next) => {
//   const { id } = req.params;

//   return createList(id)
//     .then((response) => {
//       res.status(200).json(response);
//     })
//       .catch((error) => next(error));
// };

// const getNewProduct = async (req, res, _next) => {
//   const { id } = req.params;
//   console.log(id);

//   const result = await getProducts(id);
//   console.log('result controller', result);
//   res.status(200).json(result);

//   // return getProducts(id)
//   //   .then((response) => {
//   //     res.status(200).json(response);
//   //   })
//   //     .catch((error) => {
//   //       console.log('tia');
//   //       next(error);
//   //     });
// };

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await getProduct(id);

  const { status, message } = result;
  
    if (id) {
   return res.status(200).json(result);
  }
 return res.status(status).json(message);
};

const getAll = async (req, res) => {
  const result = await getProducts();
  return res.status(200).json(result);
};

module.exports = {
  createNewProduct,
  // getListOrId,
  // getNewProduct,
  getProductById,
  getAll,
};
