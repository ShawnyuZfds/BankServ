var express = require('express');
var app = express();
var router = express.Router();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var assert = require('assert');


var url = 'mongodb://localhost:27017/BankDB';

/* GET users listing. */
router.route('/add')
    .post(function (req, res, next) {
        console.log('requested');
        console.log(req.body);
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to Mongo server");

            // Get the documents collection
            var collection = db.collection('users');
            // console.log(req.query[0]);
            // collection.insertMany(JSON.parse(req.query));
            var request = [];
            // for (x in req.body) {
            // request.push(req.body[x]);
            console.log(request);
            // }
            collection.insert(req.body);
            db.close();
            // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
            //     console.log(data);
            //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            //     res.end(data);
            // });
        });
    });

router.route('/get').get(function (req, res, next) {
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
});

router.route('/del')
    .all(function (req, res, next) {
        console.log('del requested');
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to Mongo server");
            console.log(req.query);
            // Get the documents collection
            var collection = db.collection('users');

            for (x in req.query) {
                console.log(req.query[x]);
                var whereStr = {_id: new mongodb.ObjectID(req.query[x])};
                // var BSON = require('mongodb').BSONPure;
                // whereStr = {_id: BSON.ObjectID.createFromHexString('5700afc1ea82edf8359a1530')};
                collection.remove(whereStr, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    // console.log(result);
                    db.close();
                });
            }
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
    });

router.post('/put', function (req, res, next) {
    // console.log(JSON.stringify(req));
    console.log("put!");
    console.log(req.query);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    });
    res.end("success");
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     console.log(data);
    //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    //     res.end(data);
    // });
});

router.route('/test')
    .post(function (req, res, next) {
        console.log('requested');
        console.log(req.body);
        console.log(JSON.stringify(req.headers));
        req.accepts('json,text');
        req.accepts('application/json');
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        })
        res.end("post");
        // fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        //     console.log(data);
        //     res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        //     res.end(data);
        // });
    });
module.exports = router;
