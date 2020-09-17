var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/board');
  }else{
    res.render('index');
  }
});

module.exports = router;
