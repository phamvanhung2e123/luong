/**
 * Created by hoangnn on 2/27/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var MonthlySchema = mongoose.Schema({
	Month: Number,
	login: Number,
	new_user: Number,
	paid_user: Number,
	paid_value: Number
});

var MonthlyModel = db.model("MonthlyLog", MonthlyModel);

modeule.exports = MonthlyModel;