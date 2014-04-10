/**
 * Created by hoangnn on 4/10/14.
 */
var _ = require("underscore");
var util = require("util");
var DailyActiveModel = require("../models/DailyActiveModel");
var AppInfoModel = require("../models/AppInfoModel");
var PaidModel = require("../models/PaidModel");

function validate_app_id(app_id) {
	if (!_.isString(app_id))
	{
		return false;
	}

	return true;
}


module.exports = function (app) {
	var info = {};
	info.dau = function (req, res) {
		var app_id = req.query.app_id;
		var date = new Date(req.query.date).addDays(-1);
		console.log("App: " + app_id + "  date: " + date);
		DailyActiveModel.aggregate([
				{$match: {time: {$gte: date}, app_id: app_id}},
				{$group: {_id: {time: '$time'}, count: {$sum: 1}}}
			]).exec(function (err, result) {
			if (err)
			{
				console.log("Info err: " + util.inspect(err));
			} else
			{
				console.log("Info res: " + util.inspect(result));
			}
			res.send("OK: " + util.inspect(result));
		});
	}

	info.install = function (req, res) {
		console.time("install");
		var app_id = req.query.app_id;
		var date = new Date(req.query.date).addDays(-1);
		console.log("App: " + app_id + "  date: " + date);
		AppInfoModel.aggregate([
				{$match: {time: {$gte: date}, app_id: app_id}},
				{$group: {_id: {time: '$time'}, count: {$sum: 1}}}
			]).exec(function (err, result) {
			if (err)
			{
				console.log("Info err: " + util.inspect(err));
			} else
			{
				console.log("Info res: " + util.inspect(result));
			}
			res.send("OK: " + util.inspect(result));
			console.timeEnd("install");
		});
	}

	info.revenue = function (req, res) {
		console.time("revenue");
		var app_id = req.query.app_id;
		var date = new Date(req.query.date).addDays(-1);
		console.log("App: " + app_id + "  date: " + date);
		PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: {time: '$time'}, count: {$avg: '$paid_converted'}}}
		]).exec(function (err, result) {
			if (err)
			{
				console.log("Info err: " + util.inspect(err));
			} else
			{
				console.log("Info res: " + util.inspect(result));
			}
			res.send("OK: " + util.inspect(result));
			console.timeEnd("revenue");
		});
	}

	return info;
}