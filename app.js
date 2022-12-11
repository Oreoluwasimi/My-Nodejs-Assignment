const  express = require('express');
const sequelize = require('./db/sequelize');
const dbInit = require('./db/relations'); // run model relationships

const productRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

app.listen(3000, async () => {
  // wait to sync all models to db
  try {
    dbInit()
    await sequelize.sync();
    console.log('Models synced successfully');
  } catch (e) {
    console.log(e)
    // you can add an error middle ware
  }
});
