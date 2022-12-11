const express = require('express');
const router = express.Router();
const Product = require('../db/Product');
const Sales = require('../db/Sales');

/*
  To make a sale, get the product
  we assume that quantity is unlimited
 */
router.post('/:productId', async (req, res, next) => {
    try {
        const inputPrice = parseInt(req.body.inputPrice);
        const { productId } = req.params;
        const existingProduct = await Product.findByPk(productId);

        if (!existingProduct) {
            return res
                .status(404)
                .send({
                    message: 'Product not found'
                });
        }

        if (inputPrice < existingProduct.price) {
            return res
                .status(400)
                .send({
                    message: 'Insufficient amount for product'
                });
        }

        const newSale = Sales.build({priceSold: inputPrice});
        newSale.setProduct(existingProduct, {save: false});

        await newSale.save();

        return res.status(201).send({
            message: 'Sale made successfully',
            data: {
                sale: newSale,
                productId
            }
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({
            message: 'Error saving Sale'
        })
    }

});


module.exports = router;
