/**
 * Created by hoangnn on 2/27/14.
 */
var logParser = require("../helper/parse_log");
var UniqueUserModel = require("../models/UniqueUserModel");
var LogModel = require("../models/LogModel");
var util = require("util");
var async = require("async");

module.exports = function (io) {
	var log = {};
	log.report = function (req, res, next) {
		if (req.route.method == "get")
		{
			return res.render("report", {message: ""});
		}
		var record = req.body.record;
		var Log = logParser.parse(record);

		UniqueUserModel.find({uuid: Log.uuid}, function (err, res) {
			if (err)
			{
				console.log(err);
			} else
			{
				if (res.length === 0)
				{
					var uniqueUser = new UniqueUserModel();
					uniqueUser.uuid = Log.uuid;
					uniqueUser.save(function (err, res) {
						if (err)
						{
							console.log("Error");
						} else
						{
							console.log("Success save: " + util.inspect(res));
							io.sockets.emit("new_user", {message: "On new report of new user",isNew: 1});
						}
					});
				}else{
					io.sockets.emit("new_user", {message: "On new report but old user", isNew: 0});
				}


			}
		});

		req.flash("success", "Success report");
		res.render("report", {message: req.flash("success")});
	}

	log.statistic = function (req, res) {
		var data = {};
		async.waterfall([
			function (callback) {
				UniqueUserModel.distinct("uuid", callback);
			},
			function (result, callback) {
				data.new_user = result.length;
				LogModel.distinct("uuid", callback);
			}
		], function (err, result) {
			data.all_user = result.length;
			req.session.data = data;
			res.render("statistic", data);
		});

	}

	return log;
}
