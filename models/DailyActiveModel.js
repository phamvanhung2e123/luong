/**
 * Created by hoangnn on 4/9/14.
 * For Loggee
 */

var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/loggee');

var DailyActiveSchema = mongoose.Schema({
	time: Date,
	app_id: String,
	uuid: String,
	created: String
})


var DailyActiveModel = db.model('DailyActive', DailyActiveSchema);

module.exports = DailyActiveModel;

