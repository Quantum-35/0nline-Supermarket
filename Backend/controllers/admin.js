const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  console.log('@@@@@@@@', req.user)
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, description, price, imageUrl, null, req.user._id);
  product.save().then(result => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err)
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode || editMode !== 'true'){
    res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then((product) => {
    if(!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      prod: product
    });
  })
  .catch(err => {
    console.log(err)
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const { title, imageUrl, price, description } = req.body;
  Product.findById(productId)
  const product = new Product(title, description, price, imageUrl, new mongodb.ObjectID(productId));
  product.save().then(result => {
      console.log("Product Updated")
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    })
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    console.log(err)
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err)
  });
};

