/**
 * Created by Asura on 2014/10/30.
 */

var db = require('./db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var relationship = db.relationship;


var UserSchema = new Schema({
	username : {type : String},
	age : {type : Number},
	email : {type : String ,unique : true },
	company : {type : Schema.ObjectId, ref:'Company', childPath : 'users'}
});

UserSchema.method.getByName = function(username,page,callback){
    var query={};
    var pageIndex = 1;
    var pagesize = 10;
    var skip = 0;

    if(page.pageIndex){
        pageIndex = page.pageIndex > 0 ? page.pageIndex : pageIndex ;
    }
    if(page.pagesize){
        pagesize = page.pagesize > 0 ? page.pagesize : pagesize ;
    }
    if(name){
        skip = ( pageIndex -1 ) * pagesize;
        query['username']=new RegExp(name);
        this.find(query).sort('_id').skip(skip).limit(pagesize).exec(callback);
    }
    else{
        callback('参数错误！');
    }
};

UserSchema.method.list = function(username,age,email,page,callback){
    var query={};
    var pageIndex = 1;
    var pagesize = 10;
    var skip = 0;

    if(page.pageIndex){
        pageIndex = page.pageIndex > 0 ? page.pageIndex : pageIndex ;
    }
    if(page.pagesize){
        pagesize = page.pagesize > 0 ? page.pagesize : pagesize ;
    }
    skip = ( pageIndex -1 ) * pagesize;
    if(username){
        query['name']=new RegExp(username);
    }
    if(age){
        query['phone']=new RegExp(age);
    }
    if(email){
        query['users']=new RegExp(email);
    }
    this.find(query).sort('_id').skip(skip).limit(pagesize).exec(callback);
};

UserSchema.plugin(relationship, {relationshipPathName : 'company'});

exports.User = mongoose.model('User',UserSchema);
