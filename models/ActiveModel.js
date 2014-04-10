/**
 * Created by hoangnn on 4/9/14.
 */
var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/loggee');
require("date-utils");

var ActiveSchema = mongoose.Schema({
	app_id: String,
	uuid: String,
	start_time: Number,
	end_time: Number,
	created: String,
	modified: String
})


var ActiveModel = db.model('Active', ActiveSchema);

ActiveModel.getDailyActiveUserByDate = function (date, callback) {
	var today_start = Math.round(new Date(date.toYMD()).getTime() / 1000);
	var today_end = today_start + 24 * 60 * 60;

	ActiveModel.distinct('uuid', {'$and': [
		{start_time: {$gte: today_start}},
		{start_time: {$lt: today_end}}
	]}, function (err, res) {
		if (err)
		{
			return callback(err, null);
		} else
		{
			return callback(null, res);

		}
	});
}

ActiveModel.activeUser = function (uuid, app_id, callback) {
	active = new ActiveModel()
	active.start_time = Math.round(Date.now() / 1000);
	active.created = new Date();
	active.uuid = uuid;
	active.save(function (err, res) {
		return callback(err, res);
	});
}


module.exports = ActiveModel;

