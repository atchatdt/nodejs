var express = require('express');
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');


var router = express.Router();

router.get('/',controller.index);

router.get('/cookie',function(req,res,next){
    res.cookie('userid',123456);
    res.send('hello');

})

router.get('/search',controller.search);

router.get('/create',controller.getCreate);

router.post('/create',validate.postCreate,controller.postCreate);

router.get('/:id',controller.get);

module.exports = router;
