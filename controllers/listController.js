const { createProduct } = require('../services/listServices');

const createNewProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  return createProduct(name, quantity)
    .then((response) => {
      res.status(201).json(response);
    })
      .catch((error) => next(error));

  // res.status(422).json({ message: '"quantity" must be a number larger than or equal to 1' });
};

module.exports = {
  createNewProduct,
};
