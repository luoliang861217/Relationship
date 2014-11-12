var db = require('./db');
var mongoose = db.mongoose;
var Schema = db.Schema;
var relationship = db.relationship;

var CompanySchema = new Schema({
	name :{type : String },
	phone : {type : String},
	users : [{type : Schema.ObjectId, ref : 'User'}]
});

exports.Company = mongoose.model('Company',CompanySchema);