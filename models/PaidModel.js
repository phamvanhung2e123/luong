/**
 * Created by hoangnn on 4/9/14.
 * For Loggee
 */
var constant = require("../config/constant");

var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/loggee');

var PaidSchema = mongoose.Schema({
	timestamp: Number,
	time: Date,
	app_id: String,
	uuid: String,
	os: String,
	os_version: String,
	os_name: String,
	os_language: String,
	app_version: String,
	location: String,
	item_name: String,
	paid_value: Number,
	paid_converted: Number,
	coin_unit: String,
	coin_converted_unit: {type: String, default: constant.COIN_UNIT_USA},
	created: String
})


var PaidModel = db.model('Paid', PaidSchema);

module.exports = PaidModel;

