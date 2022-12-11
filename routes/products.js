const express = require('express');
const router = express.Router();
const Product = require('../db/Product');
const Sales = require('../db/Sales');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await Product.findAll();
  res.status(200).send({
    data: products,
    total: products.length
  })
});

router.get('/:id', async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findByPk(productId);
  const allSales = await product.getSales();

  const formattedSales = allSales.map((sale) => {
    return {
      id: sale.id,
      productId: sale.ProductId,
      dateSold: sale.createdAt,
      priceSold: sale.priceSold
    }
  })

  if (!product) {
    return res.status(404).send({
      message: 'Product not found'
    });
  }

  res.status(200).send({
    data: {
      product,
      sales: formattedSales // all sales for this product
    }
  });
});

router.post('/', async (req, res, next) => {
  try {
    const newProduct = Product.build({...req.body});
    await newProduct.save();

    return res.status(201).send({
      message: 'Product Saved successfully',
      data: newProduct
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: 'Error saving Product'
    })
  }

});

router.delete('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findByPk(productId, {
      include: Sales
    });

    if (!existingProduct) {
      return res.status(404).send({
        message: `Product with id ${productId} does not exist`
      });
    }

    await existingProduct.destroy();
    res.status(201).send({
      message: 'Product Deleted successfully',
    });
  } catch (e) {
    res.status(400).send({
      message: 'Error saving Product'
    })
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      return res.status(404).send({
        message: `Product with id ${productId} does not exist`
      });
    }

    // update fields in the db
    await existingProduct.update({...req.body});
    await existingProduct.save()

    res.status(201).send({
      message: 'Product updated successfully',
      data: existingProduct
    });
  } catch (e) {
    res.status(400).send({
      message: 'Error saving Product'
    })
  }
});

module.exports = router;
