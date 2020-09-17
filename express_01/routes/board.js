var express = require('express');
var router = express.Router();
var conn = require('../database/mysql');

router.get('/', function(req, res, next) {
    var sql = 'select * from items limit 0,9';
    conn.query(sql,values, function(err,rows){
        if(err){
            res.render('board', {'status':'Error'});
        }else{
            if(req.session.login_id == 'vckfnv'){
                res.render('board',{'status':'OK', 'data':rows, 'pageNum':1, 'username': req.session.username, 'manager':'OK'});            
            }else{
                res.render('board',{'status':'OK', 'data':rows, 'pageNum':1, 'username': req.session.username});            
            }
           
        }
    });
});

router.get('/pages', function(req, res, next) {
    var sql = 'select * from items limit ?,9';
    if (req.query.pageNum){
        var values = (parseInt(req.query.pageNum));
        console.log(values);
        conn.query(sql,values*9, function(err,rows){
            if(err){
                res.render('board', {'status':'Error'});
            }else{
                console.log(values,'haha');
                res.render('board',{'status': 'OK','data':rows, 'pageNum':values+1});
                console.log(values,'haha2');
            }
        });
    }
    if (req.query.pagenum){
        var values = (parseInt(req.query.pagenum)-2);
        console.log(values);
        conn.query(sql,(values)*9, function(err,rows){
            if(err){
                res.render('board', {'status':'Error'});
            }else{
                console.log(values,'haha');
                res.render('board',{'status': 'OK','data':rows, 'pageNum':values+1});
                console.log(values,'haha2');
        }
    });
    }
    
});

router.get('/info',function(req,res,next){
    var sql = 'select * from items where item_id=?';
    var value = req.query.item_id;
    console.log(value);
    conn.query(sql,value,function(err,rows){
        if(err){
            
            console.log('error!!');
        }else{
            if(rows.length == 0){
                console.log('somethign wrong with the item..');
            }else{
                res.render('info',{'data':rows[0], 'item_name':rows[0].item_name});
            }
        }
    })
})

router.post('/search',function(req,res,next){
    var sql ="select * from suppliers, items where items.sup_id=suppliers.sup_id and sup_ind = ? and item_name like ?";
    var value = [req.body.search_ind, '\%'+req.body.searchkey+'\%'];
    console.log(value);
    conn.query(sql,value,function(err,rows) {
        if(err){
            console.log('errooooor');
        }else{
            if(rows.length == 0){
            }else{
                res.render('board',{'data':rows,'pageNum':1})
            }
        }
        
    })
})

router.post('/class',function(req,res,next){
    var sql ="SELECT item_id, item_name from items where item_id in(\
        select distinct item_id from classification where item_id not in(\
            select item_id from classification where ing_id in(\
                select ing_id from ing_veg_class where veg_class_id = ?)))";
    if(req.body.veg_class == 'Fruitarian'){
        var value = '1';
    }else if(req.body.veg_class == 'Vegan'){
        var value = '2';
    }else if(req.body.veg_class == 'Lacto'){
        var value = '3';
    }else if(req.body.veg_class == 'Ovo'){
        var value = '4';
    }else if(req.body.veg_class == 'Lacto-ovo'){
        var value = '5';
    }else if(req.body.veg_class == 'Pesco'){
        var value = '6';
    }else if(req.body.veg_class == 'Pollo'){
        var value = '7';
    }else{
        var value = '7';
    }
    console.log(value);
    conn.query(sql,value,function(err,rows) {
        if(err){
            console.log('errooooor');
        }else{
            if(rows.length == 0){
            }else{
                res.render('board',{'data':rows,'pageNum':1})
            }
        }
        
    })
})

router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/');
});

router.get('/useredit',function(req,res,next) {
    conn.query('select * from users',function(err,rows){
        if(err){
            res.redirect('/board');
        }else{
            res.render('useredit',{'data':rows});
        }
    })
})



module.exports = router;

