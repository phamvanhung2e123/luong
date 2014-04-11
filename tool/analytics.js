/**
 * Created by hoangnn on 4/9/14.
 * For Loggee
 */
var AppInfoModel = require("../models/AppInfoModel");
var ActiveModel = require("../models/ActiveModel");
var DailyActiveModel = require("../models/DailyActiveModel");
var PaidModel = require("../models/PaidModel");
require("date-utils");
var winston = require("winston");
var util = require("util");

var analytics = module.exports;

/**
 * install log process,insert to app install collection if user never installed before
 * @param log
 * @param callback
 */
analytics.install = function (log, callback) {
	AppInfoModel.find({uuid: log.uuid, app_id: log.app_id}, function (err, res) {
		if (err)
		{
			return callback(err, null);
		}

		if (res.length === 0)
		{
			var app_info = new AppInfoModel();
			app_info.created = new Date().toISOString();
			app_info.timestamp = Math.round(Date.now() / 1000);
			app_info.time = Date.today();
			app_info.uuid = log.uuid;
			app_info.app_id = log.app_id;
			app_info.os = log.os;
			app_info.os_version = log.os_version;
			app_info.os_name = log.os_name;
			app_info.os_language = log.os_language;
			app_info.app_version = log.app_version;
			app_info.localtion = log.localtion;
			app_info.save(function (err, res) {
				if (err)
				{
					console.log(err);
					return callback(err, null);
				} else
				{
					console.log(res);
					return callback(null, {insert: 1})
				}
			});
		} else
		{
			return callback(null, null);
		}
	});
}

/**
 * active new user, inactive before session if exist
 * @param log
 * @param callback
 */
analytics.active = function (log, callback) {
	var current = Math.round(Date.now() / 1000);

	// update previous active record if exist
	ActiveModel.findOneAndUpdate(
		{end_time: null, app_id: log.app_id, uuid: log.uuid},
		{end_time: current, modified: new Date().toISOString()}, {start_time: -1},
		function (err, res) {
		if (err)
		{
			console.log(err);
		} else
		{
			console.log(res);
		}
	}
	);

	// insert new record for current active
	var active = new ActiveModel();
	active.start_time = Math.round(Date.now() / 1000);
	active.app_id = log.app_id;
	active.os = log.os;
	active.os_version = log.os_version;
	active.os_name = log.os_name;
	active.os_language = log.os_language;
	active.app_version = log.app_version;
	active.localtion = log.localtion;
	active.created = new Date().toISOString();
	active.uuid = log.uuid;
	active.save(function (err, res) {
		if (err)
		{
			console.log("Active err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("Active res: " + util.inspect(res));
			return callback(null, {active: 1});
		}
	});
}


/**
 * inactive user session if exist
 * @param log
 * @param callback
 */
analytics.inactive = function (log, callback) {
	var current = Math.round(Date.now() / 1000);
	ActiveModel.findOneAndUpdate(
		{end_time: null, app_id: log.app_id, uuid: log.uuid},
		{end_time: current, modified: new Date().toISOString()},
		{start_time: -1},
		function (err, res) {
			if (err)
			{
				console.log("Inactive err: " + util.inspect(err));
				return callback(err, null);
			} else
			{
				console.log("Inactive res: " + util.inspect(res));
				if (res == null)
				{
					return callback(null, null);
				} else
				{
					return callback(null, {inactive: 1});
				}

			}
		});
}

/**
 * login user, insert to login collect if user not exist today
 * @param log
 * @param callback
 */
analytics.login = function (log, callback) {

	var today = Date.today();
	var tomorrow = Date.tomorrow();

	DailyActiveModel.findOne({$and: [
		{uuid: log.uuid},
		{time: {$gte: today}},
		{time: {$lt: tomorrow}},
		{app_id: log.app_id}
	]}, function (err, res) {
		if (err)
		{
			console.log(err);
			return callback(err, null);
		} else
		{
			if (res === null || res.length === 0)
			{
				daily = new DailyActiveModel();
				daily.app_id = log.app_id;
				daily.uuid = log.uuid;
				daily.os = log.os;
				daily.os_version = log.os_version;
				daily.os_name = log.os_name;
				daily.os_language = log.os_language;
				daily.app_version = log.app_version;
				daily.localtion = log.localtion;
				daily.time = today;
				daily.timestamp = Math.round(Date.now() / 1000);
				daily.created = new Date().toISOString();
				daily.save(function (err, res) {
					if (err)
					{
						console.log(err);
						return callback(err, null);
					} else
					{
						console.log(res);
						return callback(null, {login: 1});
					}
				});
			} else
			{
				console.log(res);
				return callback(null, null);
			}
		}
	});
}

/**
 * get convert ratio for coin unit
 * @param coin_unit
 * @returns {number}
 */
function convert_ratio(coin_unit) {
	if (coin_unit == "JP")
	{
		return 0.73;
	}

	return 1;
}

/**
 * convert coin from coin unit tp usd
 * @param coin_unit
 * @param value
 * @returns {string}
 */
function convert_coin(coin_unit, value) {
	convert_rate = convert_ratio(coin_unit);
	return Number(value * convert_rate).toFixed(2);
}

/**
 * process paid log, insert to paid collection
 * @param log
 * @param callback
 */
analytics.paid = function (log, callback) {
	var paid_model = new PaidModel();
	paid_model.timestamp = Math.round(Date.now() / 1000);
	paid_model.time = Date.today();
	paid_model.uuid = log.uuid;
	paid_model.app_id = log.app_id;
	paid_model.os = log.os;
	paid_model.os_version = log.os_version;
	paid_model.os_name = log.os_name;
	paid_model.os_language = log.os_language;
	paid_model.app_version = log.app_version;
	paid_model.localtion = log.localtion;
	paid_model.paid_value = log.paid_value;
	paid_model.coin_unit = log.coin_unit;
	paid_model.paid_converted = convert_coin(paid_model.coin_unit, paid_model.paid_value);
	paid_model.created = new Date().toISOString();
	paid_model.save(function (err, res) {
		if (err)
		{
			console.log(err);
			return callback(err, null);
		} else
		{
			console.log(res);
			return callback(null, {uuid: log.uuid, paid: paid_model.paid_converted});
		}
	});
}