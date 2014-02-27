/**
 * Created by hoangnn on 2/27/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var WeeklySchema = mongoose.Schema({
	week: Number,
	login_user: Number,
	new_user: Number,
	paid_user: Number,
	paid_value: Number
});

var WeeklyModel = db.model("WeeklyLog", WeeklySchema);

module.exports = WeeklyModel;