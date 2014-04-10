/**
 * Created by hoangnn on 4/9/14.
 * For Loggee
 */

var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/loggee');

var AppUserInfoSchema = mongoose.Schema({
	time: Number,
	app_id: String,
	uuid: String,
	os: String,
	os_version: String,
	os_name: String,
	os_language: String,
	app_version: String,
	location: String,
	created: String
});


var AppUserInfoModel = db.model('AppUser', AppUserInfoSchema);

module.exports = AppUserInfoModel;

