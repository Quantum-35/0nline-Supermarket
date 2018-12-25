const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const product = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {PageTitle: 'Add product'});
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    product.push({title: req.body.title})
    console.log(product);
  res.redirect('/');
});

module.exports = router;