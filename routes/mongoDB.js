var express = require('express');
var app = express();
var router = express.Router();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/BankDB';

/* GET users listing. */
router.route('/')
    .post(function (req, res, next) {
        console.log('requested');
        var insert = req.body;
        console.log(insert);
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to Mongo server");
            console.log('insert: ' + JSON.stringify(insert));
            // Get the documents collection
            var collection = db.collection('users');
            // console.log(req.query[0]);
            // collection.insertMany(JSON.parse(req.query));
            // var request = [];
            // for (x in req.body) {
            // request.push(req.body[x]);
            // console.log(request);
            // }
            collection.insertMany(insert);
            db.close();
            // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
            //     console.log(data);
            res.writeHead(200, {
                // 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end();
            // });
        });
    })
    .get(function (req, res, next) {
        // console.log(JSON.stringify(req));
        MongoClient.connect(url, function (err, db) {
            console.log("Connected correctly to Mongo server");
            // Get the documents collection
            var collection = db.collection('users');
            var whereStr = {};
            collection.find(whereStr).toArray(function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
                // console.log(result);
                db.close();
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify(result));
                // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
                //     console.log(data);
                //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                //     res.end(data);
                // });
            });

        })
    })
    .delete(function (req, res, next) {
        console.log('del requested');
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to Mongo server");
            console.log(req.query);
            var del = req.query;
            // Get the documents collection
            var collection = db.collection('users');
            var whereStr = [];
            for (x in req.query) {
                whereStr.push({_id: mongodb.ObjectID(req.query[x])});
            }
            collection.deleteMany({$or: whereStr}, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                db.close();
            });

            // for (x in req.query) {
            //     console.log(req.query[x]);
            //     var whereStr = {_id: new mongodb.ObjectID(req.query[x])};
            //     collection.removeMany(whereStr, function (err, result) {
            //         if (err) {
            //             console.log(err);
            //             return;
            //         }
            //     });
            //
            // }

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE'
            });
            res.end();
            // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
            //     console.log(data);
            //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            //     res.end(data);
            // });
        });
    })
    .put(function (req, res, next) {
        // console.log(JSON.stringify(req));
        console.log("put!");
        console.log(req.body[0]);
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('users');
            for (x in req.body) {
                var exp = {_id: mongodb.ObjectID(req.body[x]._id)};
                console.log(exp);
                delete req.body[x]._id;
                console.log(req.body[x]);
                collection.updateOne(exp, req.body[x]);
            }
            setTimeout(function () {
                db.close();
            }, 500);
        })

        res.writeHead(200, {
            // 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        });
        res.end("success");
        // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     console.log(data);
        //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        //     res.end(data);
        // });
    })
// router.route('/')
//
//
// router.route('/')
//
//
// router.route('/')


module.exports = router;
