const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middlewares/errorMiddleware');
const { createNewProduct,
  getProductById, 
  getAll, getUpdateProduct, getDeletProduct } = require('./controllers/listController');
const { getSalesProducts, getSalesList, getSalesById } = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createNewProduct);

app.delete('/products/:id', getDeletProduct);

app.get('/products/:id', getProductById);
app.get('/products', getAll);

app.put('/products/:id', getUpdateProduct);

app.post('/sales', getSalesProducts);

app.get('/sales/:id', getSalesById);
app.get('/sales', getSalesList);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
