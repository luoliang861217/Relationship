
/*
 * GET home page.
 */

var COMPANY = require('../modules/company');
var USER = require('../modules/user');
var url = require('url');
var querystring = require('querystring');
var Company = COMPANY.Company;
var User = USER.User;


exports.index = function(req, res){
//	var company = new Company({
//		name : 'test',
//		phone : '0753-3801659'
//	});
//	company.save(function(err,com){
//		if(err){
//  			res.render('index', { title: 'Express bad' });
//		}
//		else{
//			var user = new User({
//				username :'aoli',
//				age : 1000,
//				email : 'luo33.888132@163.com',
//				company : '5461c311a78affd41cb0d8a8'
//			});
//			user.save(function(err,user){
//				if(err){
//  					res.render('index', { title: 'Express bad' });
//				}
//				else{
//
//				}
//			});
//		}
//	});

//    User.find({company: '5461c311a78affd41cb0d8a8' },function(err,users){
//        if(users){
//            var str = users.toString();
//            console.log(str);
//            res.render('index', { title: 'Express ' + str });
//        }else{
//            res.render('index', { title: 'Express bad' });
//        }
//
//    });

//    User.find({username: /u/ },function(err,users){
//        if(users){
//            var str = users.toString();
//            console.log(str);
//            res.render('index', { title: 'Express ' + str });
//        }else{
//            res.render('index', { title: 'Express bad' });
//        }
//
//    });



    var paramStr = url.parse(req.url).query;
    var param = querystring.parse(paramStr);
    var pageIndex = 0;
    var pagesize = 1;
    var key ='';
    var skip = 0;
    var query={};

    if(param.pageIndex){
        pageIndex = param.pageIndex;
    }
    if(param.pagesize){
        pagesize = param.pagesize;
    }
    if(param.key){
        key = param.key;
    }
    query['username']=new RegExp(key);
    var index = parseInt(pageIndex, 10);
    skip = (index > 0 ? index - 1 : index) * parseInt(pagesize, 10);
    User.find(query).skip(skip).limit(pagesize).exec(function(err,users){
        if(users){
            var str = users.toString();
            console.log(str);
            res.render('index', { title: 'Express ' + str });
        }else{
            res.render('index', { title: 'Express bad' });
        }
    });

//     User.findOne({_id: '5461c34aa78affd41cb0d8a9' }).sort('_id').limit(10).exec(function(err,user){
//         if(user){
//             var str = user.toString();
//             console.log(str);
//             res.render('index', { title: 'Express ' + str });
//         }else{
//             res.render('index', { title: 'Express bad' });
//         }
//
//     });

//5461c6c5aa7b2668217cb0d2,5461c34aa78affd41cb0d8a9
//    User.update({_id: '5461c6c5aa7b2668217cb0d2'},{$set: {username : 'asura'}},function(err,user){
//        if(user){
//            var str = user.toString();
//            console.log(str);
//            res.render('index', { title: 'Express ' + str });
//        }else{
//            res.render('index', { title: 'Express bad' });
//        }
//    });


	
};