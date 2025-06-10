import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import { getAllProducts, getProduct, insertProduct, editProduct } from './controllers/product.controller.js';
import { getTransactionByProduct, insertTransaction } from './controllers/transaction.controller.js';

const app = express();
const port = 8000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/product', insertProduct)
app.post('/transactions', insertTransaction)
app.get('/product', getAllProducts)
app.get('/product/:id', getProduct)
app.get('/transactions', getTransactionByProduct)
app.put('/product', editProduct)

app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)