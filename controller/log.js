/**
 * Created by hoangnn on 2/27/14.
 * Type = 5: Tra tien
 */
var logParser = require("../helper/parse_log");
var UniqueUserModel = require("../models/UniqueUserModel");
var RegisterModel = require("../models/RegisterModel");
var LogModel = require("../models/LogModel");
var util = require("util");
var async = require("async");
require("date-utils");
var DailyModel = require("../models/DailyModel");
var constant = require("../config/constant");
var _ = require("underscore");
var validator = require("validator");

module.exports = function (io) {

	var log = {};
	var list_value = [8400, 4300, 2900, 1700, 800, 300]

	log.daily_active = function (Log) {
		console.log("On daily active");
		var today = new Date.today();
		if (Date.compare(new Date(Log.last_login_date), today) != 0)
		{
			return;
		} else
		{
			async.waterfall([
				// check if user exist or not
				function (callback) {
					UniqueUserModel.find({uuid: Log.uuid, last_login: today}, callback);
				}, // if user not exist add to db
				function (res, callback) {
					if (res.length !== 0)
					{
						console.log("Not active user");
						console.log(res);
						return;
					} else
					{
						var uniqueUser = new UniqueUserModel();
						uniqueUser.uuid = Log.uuid;
						uniqueUser.last_login = today;
						uniqueUser.save();
						io.sockets.emit("active_user", {message: "On new report of new user", isNew: 1});
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


	}

	log.register_user = function (Log) {
		var today = new Date.today();
		async.waterfall([
			// check if user exist or not
			function (callback) {
				RegisterModel.find({uuid: Log.uuid}, callback);
			}, // if user not exist add to db
			function (res, callback) {
				console.log(util.inspect(res));

				if (res.length !== 0)
				{
					console.log("Not new user register");
					console.log(res);
					return;
				} else
				{
					console.log("New user register");
					if (Log.register_date != null)
					{
						var date = Log.register_date;
					} else
					{
						var date = today;
					}

					var registerModel = new RegisterModel()
					registerModel.uuid = Log.uuid
					registerModel.register = date;
					registerModel.save();
					io.sockets.emit("new_user", {message: "On new report of new user", isNew: 1});
					DailyModel.update({date: date}, {'$inc': {paid_user: 0, paid_value: 0, login_user: 0, register_user: 1}, '$set': {date: date}}, {upsert: true}, callback);
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

	log.paid_user = function (Log) {
		var today = new Date.today();
		if (Log.log_id == constant.LOG_PAYMENT && validator.isNumeric(Log.payment))
		{
			var payment = parseInt(Log.payment);
			if (typeof(payment) != "number")
			{
				return;
			}
			if (_.indexOf(list_value, payment) == -1)
			{
				io.sockets.emit("cheat", {message: "On cheat user", cheat_value: payment, uuid: Log.uuid, os: Log.sp_id, LG: Log.device_os});
			}
			DailyModel.update({date: today}, {'$inc': {paid_user: 1, paid_value: payment, login_user: 0, register_user: 0}, '$set': {date: today}}, {upsert: true}, function (err, res) {
				if (err)
				{
					return console.log(err);
				} else
				{
					io.sockets.emit("new_paid", {message: "On new user paid", paid_value: payment});
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
		var LogParser = logParser.parse(record);
		var Log = new LogModel(LogParser);
		Log.save();
		log.daily_active(LogParser);
		log.register_user(LogParser);
		log.paid_user(LogParser);
		//req.flash("success", "Success report");
		//res.render("report", {message: req.flash("success")});
		res.send("ok");
	}


	log.process = function (Log) {
		var today = new Date.today();
		// check for login user
		async.waterfall([
			function (callback) {
				var daily_model = DailyModel.find({date: today}, callback);
			}, function (res, callback) {
				if (res.length === 0)
				{
					// neu chua co thi tao moi
					console.log("Tao moi ok");
					callback(null, []);
				} else
				{
					callback(null, []);
				}
			}
		], function (err, result) {
			console.log("Ok man")
		})

	}


	log.statistic = function (req, res) {
		var data = {};
		var today = Date.today();
		var all_user = 0;
		//var first_date = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-01");
		async.waterfall([
			function (callback) {
				RegisterModel.count({}, callback)
			}, function (count, callback) {
				all_user = count;
				DailyModel.find({date: Date.today()}, callback);
			}
		], function (err, result) {

			console.log(util.inspect(result));
			if (err || result.length === 0)
			{
				data.new_user = 0;
				data.all_user = all_user;
				data.paid_user = 0;
				data.paid_value = 0;
			} else
			{
				data.new_user = result[0].login_user;
				data.all_user = all_user;
				data.paid_user = result[0].paid_user;
				data.paid_value = result[0].paid_value;
			}
			res.render("statistic", data);
		});
	}

	return log;
}
