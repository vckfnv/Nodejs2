var express = require('express')
var router = express.Router();
var conn = require('../database/mysql');
//login page
router.get('/',function(req,res,next){
    res.render('login');
});
//sign in processing
router.post('/process', function(req, res, next) {
    var sql = 'SELECT * from users where user_id=? and user_pwd=?';
    values = [req.body.login_id, req.body.login_pwd];
    conn.query(sql,values,function(err,rows){
            if (err){    
                res.json({'status':'Fail', 'err_msg':'error please retry'});
            }else{  
                if (rows.length == 1){
                    req.session.logined = true;
                    req.session.login_id = req.body.login_id;
                    req.session.login_pwd = req.body.login_pwd;
                    req.session.username = rows[0].user_name;
                    if (req.body.login_id =='vckfnv'){
                        console.log('hello manager');
                        res.json({'status': 'OK', 'login_id' : req.body.login_id});

                    }else{
                        res.json({'status': 'OK', 'login_id' : req.body.login_id});
                    }
                }else{
                    res.json({'status':'Fail', 'err_msg':'ID, Password error'});
                }
            }
    });
});
//checkID
router.get('/checkid', function(req, res, next) {
    var sql = 'select * from users where user_id=?';
    var values = req.query.signup_id;
    conn.query(sql,values, 
            function(err, row, field) {
                if(err){
                    console.log(req.query.signup_id);
                    res.send('ERROR');
                } else {
                    if(row.length > 0) {
                        res.send('DUPLICATED');
                    } else {
                        res.send('OK');
                    }
                }
    });
}); 
router.get('/findpwd',function(req,res,next){
    var sql = 'select user_pwd from users where user_id=?';
    var value = req.query.findid;
    console.log(value);
    console.log(typeof(value));
    conn.query(sql,value,function(err,row,field){
        if(err){
            res.send('Error');
        }else{
            if(row.length == 0){
                res.send('No data');
            }else{
                res.send(row[0].user_pwd);
            }
        }
    })
})

router.post('/signup',function(req,res,next){
    var sql = 'INSERT INTO users ' +
    '(user_id,user_pwd,user_name,user_adr,user_email,user_pnum,user_class) ' +
    'VALUES (?,?,?,?,?,?,?)';
    var values = [req.body.user_id,
        req.body.user_pwd,
        req.body.user_name,
        req.body.user_adr,
        req.body.user_email,
        req.body.user_pnum,
        req.body.user_class];
        console.log(req.body.user_pnum);
    conn.query(sql, values, function(err, row, field) {
        if(err) {
            console.log('error 1');
            res.json({'status':'ERROR'});
        } else {
            console.log('no error');
            res.json({'status':'OK'});
        }
    });
});


module.exports = router;