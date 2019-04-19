var db = require('../db');
var shortid = require('shortid');

module.exports.index =  function (req, res) {
    console.log(db.get('users').value);
    res.render('users/index',{
        users: db.get('users').value()
    });
};

module.exports.search = function(req,res){
    
    if(req.query.q){
        var q = req.query.q;
       console.log(q);
        var users = db.get('users')
        .find({ name: q })
        .value();
        console.log('aaaa***' + users.name);

        // var matchUsers =  users.filter(function(user){
        //     return user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
        // })

         res.render('users/index',{
             users:users.name,
             search:q
         });
    }
    else{
        res.render('users/index',{
            users: db.get('users').value()
        });
    }
   
};
module.exports.getCreate = function(req,res){
    res.render('users/create');
};
module.exports.postCreate = function(req,res){

    console.log('123');
    req.body.id=shortid.generate();
    var errors = [];

    if(!req.body.name){
        errors.push('Name is required');
    }

    if(!req.body.phone){
        errors.push('Phone is required');
    }

    if(errors.length){
        res.render('users/create',{
            errors:errors,
            values: req.body
        });
        return; 
    }
   db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.view= function(req,res){
    var id =  req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{user});
};

module.exports.get = function(req,res){
    var id =  req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{user});
};