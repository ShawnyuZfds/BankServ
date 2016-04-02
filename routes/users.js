var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('requested');
    var user = {
        name: req.query.username,
        password: req.query.passwd
    }
    console.log(user);
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
    res.write('respond with a resource');
    res.end();
});

module.exports = router;
