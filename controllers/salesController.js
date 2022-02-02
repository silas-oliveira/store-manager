const { salesProduct, salesList, salesById } = require('../services/salesServices');

const getSalesProducts = async (req, res, next) => {
  try {
    console.log('body controler', req.body);
    
    const result = await salesProduct(req.body);
  
    const newObject = { id: result, itemsSold: req.body };
  
    res.status(201).json(newObject);
  } catch (error) {
    next(error);
  }
};

const getSalesList = async (req, res, next) => {
  try {
    const result = await salesList();
    console.log('controler', result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await salesById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesProducts,
  getSalesList,
  getSalesById,
};