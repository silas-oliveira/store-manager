const { createProduct,
  getProduct,
  getProducts,
  updateProduct } = require('../services/listServices');

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

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getProduct(id);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// if (result.length === 0) {
//   return res.status(404).json(message);
// }

const getAll = async (req, res) => {
  const result = await getProducts();
  return res.status(200).json(result);
};

const getUpdateProduct = async (req, res, next) => {
  console.log('req body', req.body);
  console.log('req.params', req.params);
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const result = await updateProduct(name, quantity, id);
    console.log('result controler', result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewProduct,
  // getListOrId,
  // getNewProduct,
  getProductById,
  getAll,
  getUpdateProduct,
};
