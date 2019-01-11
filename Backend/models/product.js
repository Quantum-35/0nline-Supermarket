const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Product {
  constructor(title, description, price, imageUrl, id, userId) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id;
    this.userId = userId;
  }
  
  save() {
    const db = getDb();
    let dbOps;
    if(this._id){
      dbOps = db.collection('products')
              .updateOne(
                {_id: mongodb.ObjectID(this._id )}, //second obj specifies how to update
                {$set: this}
                );
    }else {
      dbOps = db.collection('products').insertOne(this)
    }
    return dbOps
    .then(results => {
      console.log(results)
    })
    .catch(err=> console.log(err));
  }
  
  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(err => console.log(err));
  }

  static findById (productId){
    const db = getDb();
    return db.collection('products')
      .find({_id: new mongodb.ObjectID(productId)})
      .next()
      .then(product => {
        console.log(product)
        return product
      })
      .catch(err => console.log(err))
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectID(prodId)})
      .then(result => {
        console.log("Deleted")
      })
      .catch(err => console.log(err))
  }
}

module.exports = Product;