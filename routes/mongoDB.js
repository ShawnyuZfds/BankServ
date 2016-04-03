var express = require('express');
var router = express.Router();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/BankDB';
// var getREST = require('./getREST');
// var postREST = require('./postREST');
// var delREST = require('./delREST');

// router.use('/get', getREST);
// router.use('/database/post', postREST);
// router.use('/database/del', delREST);
/* GET users listing. */
router.get('/get', function (req, res, next) {
    console.log('requested');
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to Mongo server");
        console.log(req.query);
        var collection = db.collection('users');
        // collection.insertMany([{"name": "1", "age": 1, "salary": 1}]);
        db.close();
    });
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(data);
    });
});
var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Insert some documents
    collection.insertMany([{a: 1}, {a: 2}, {a: 3}], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
};
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}
// Use connect method to connect to the Server


module.exports = router;
