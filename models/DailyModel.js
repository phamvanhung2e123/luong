var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');

var DailySchema = mongoose.Schema({
	date: Date,
	login_user: Number,
	register_user: Number,
	paid_user: Number,
	paid_value: Number
});

var DailyModel = db.model("DailyLog", DailySchema);

module.exports = DailyModel;