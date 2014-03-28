/**
 * Created by hoangnn on 2/27/14.
 * Type = 5: Tra tien
 */
var logParser = require("../helper/parse_log");
var UniqueUserModel = require("../models/UniqueUserModel");
var LogModel = require("../models/LogModel");
var util = require("util");
var async = require("async");
require("date-utils");
var DailyModel = require("../models/DailyModel");
var constant = require("../config/constant");

module.exports = function (io) {

	var log = {};

	log.daily_active = function (Log) {
		console.log("On daily active");
		var today = new Date.today();

		async.waterfall([
			// check if user exist or not
			function (callback) {
				UniqueUserModel.find({uuid: Log.uuid, last_login: today}, callback);
			}, // if user not exist add to db
			function (res, callback) {
				if (res.length !== 0)
				{
					console.log(res);
					return;
				} else
				{
					var uniqueUser = new UniqueUserModel();
					uniqueUser.uuid = Log.uuid;
					uniqueUser.last_login = today;
					uniqueUser.save();
					io.sockets.emit("new_user", {message: "On new report of new user", isNew: 1});
					DailyModel.update({date: today}, {'$inc': {paid_user: 0, paid_value: 0, login_user: 1, register_user: 0}, '$set': {date: today}}, {upsert: true}, callback);
				}
			}

		], function (err, res) {
			if (err)
			{
				return console.log(err);
			}

			return console.log(res);
		});
	}

	log.register_user = function (Log) {
		console.log(util.inspect(Log));
		var today = new Date.today();
		if (Log.register_date)
		{

			console.log(Date.compare(new Date(Log.register_date), today));
		}
	}

	log.paid_user = function (Log) {
		var today = new Date.today();
		if (Log.log_id == constant.LOG_PAYMENT)
		{
			DailyModel.update({date: today}, {'$inc': {paid_user: 1, paid_value: Log.payment, login_user: 0, register_user: 0}, '$set': {date: today}}, {upsert: true}, function (err, res) {
				if (err)
				{
					return console.log(err);
				} else
				{
					io.sockets.emit("new_paid", {message: "On new user paid", paid_value: Log.payment});
					return console.log(res);
				}
			});

		}
	}

	log.report = function (req, res, next) {
		if (req.route.method == "get")
		{
			return res.render("report", {message: ""});
		}
		var record = req.body.record;
		var Log = logParser.parse(record);

		log.daily_active(Log);
		log.register_user(Log);
		log.paid_user(Log);
		req.flash("success", "Success report");
		res.render("report", {message: req.flash("success")});
	}


	log.statistic = function (req, res) {
		var data = {};
		var today = Date.today();
		var first_date = new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-01");
		DailyModel.find({date: Date.today()}, function (err, result) {
			if (err || result.length === 0)
			{
				data.new_user = 0;
				data.all_user = 0;
				data.paid_user = 0;
				data.paid_value = 0;
			} else
			{
				data.new_user = result[0].register_user;
				data.all_user = result[0].login_user;
				data.paid_user = result[0].paid_user;
				data.paid_value = result[0].paid_value;
			}
			res.render("design", data);
		});

		DailyModel.find({'date':{$gte: first_date}}, function(err, res){
			if(err)
			{
				console.log(err);
			}else{
				console.log(res);
			}

			console.log(first_date);
		})
	}

	return log;
}
