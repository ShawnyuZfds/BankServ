var express = require('express');
var router = express.Router();
var fs = require("fs");


/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(data);
    });
});

module.exports = router;