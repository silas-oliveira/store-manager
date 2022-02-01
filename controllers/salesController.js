const { salesProduct } = require('../services/salesServices');

const getSalesProducts = async (req, res, next) => {
  try {
    console.log('body controler', req.body);
    
    const result = await salesProduct(req.body);
  
    const newObject = { id: result, itemsSold: req.body };
  
    res.status(200).json(newObject);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesProducts,
};