const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const customLoggerMiddleWare = require('./Middlewares/loggerMiddleware');
const tokenValidatorMiddleware = require('./Middlewares/tokenValidatorMiddleware');
const authenticateRouter = require('./Routes/authenticate');
const ProductRouter = require('./Routes/product');

const app = express();
dotenv.config();

app.use(express.json());
app.use(customLoggerMiddleWare);
app.use('/auth', authenticateRouter);
app.use('/products', tokenValidatorMiddleware, ProductRouter);

connect(process.env.DB_CONNECTION_URL);

app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port ' + process.env.PORT);
});
