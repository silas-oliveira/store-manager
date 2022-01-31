const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middlewares/errorMiddleware');
const { createNewProduct,
  getProductById, getAll, getUpdateProduct } = require('./controllers/listController');

const app = express();

app.use(bodyParser.json());

require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createNewProduct);

app.get('/products/:id', getProductById);
app.get('/products', getAll);

app.put('/products/:id', getUpdateProduct);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
