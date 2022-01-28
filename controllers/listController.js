const { createProduct } = require('../services/listServices');

const createNewProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  return createProduct(name, quantity)
    .then((response) => {
      res.status(201).json(response);
    })
      .catch((error) => next(error));
};

module.exports = {
  createNewProduct,
};
