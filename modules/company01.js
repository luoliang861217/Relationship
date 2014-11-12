var db = require('./db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var relationship = db.relationship;

var CompanySchema = new Schema({
	name :{type : String },
	phone : {type : String},
	users : [{type : Schema.ObjectId, ref : 'User'}]
});

CompanySchema.method.getByName = function(name,page,callback){
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
        query['name']=new RegExp(name);
        this.find(query).sort('_id').skip(skip).limit(pagesize).exec(callback);this.find().$l
    }
    else{
        callback('参数错误！');
    }
};

CompanySchema.method.list = function(name,phone,users,page,callback){
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
    if(name){
        query['name']=new RegExp(name);
    }
    if(phone){
        query['phone']=new RegExp(phone);
    }
    if(users){
        query['users']=new RegExp(users);
    }
    this.find(query).sort('_id').skip(skip).limit(pagesize).exec(callback);
};

exports.Company = mongoose.model('Company',CompanySchema);