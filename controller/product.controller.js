var db = require('../db');

module.exports.getProduct = function(req,res){

    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = page * perPage;

    var drop = (page - 1) * perPage;



    var products =db.get('products').drop(drop).take(perPage).value();
    var pagination = db.get('products').value();

    if(page ==1)
    {
        Pagination = [page,page+1,page+2];
    }
    else{
        Pagination = [page -1,page,page+1];
    }


    res.render('product/index',{
        products: products,
        pagination: Pagination
    });
}