const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:27017/onlineMarket', { useNewUrlParser: true })
    .then(client => {
        _db = client.db();
        callback();
        console.log("Connected ")
    })
    .catch(err => console.log(err));
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw "No Database Found";
}

exports.mongoConnect= mongoConnect;
exports.getDb = getDb;