/**
 * Created by hoangnn on 4/10/14.
 */
var _ = require("underscore");
var util = require("util");
var summary = require("../tool/summary");

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
		console.log("App id: " + app_id + " date : " + date);
		summary.dauFromDate(date, app_id, function(err, result){
			return res.send(result);
		});
	}

	info.install = function (req, res) {
		var app_id = req.query.app_id;
		var date = new Date(req.query.date).addDays(-1);
		summary.installFromDate(date, app_id, function(err, result){
			return res.send(result);
		});
	}

	info.revenue = function (req, res) {
		var app_id = req.query.app_id;
		var date = new Date(req.query.date).addDays(-1);
		summary.revenueFromDate(date, app_id, function(err, result){
			return res.send(result);
		});
	}

	info.active = function(req, res){
		var current = Math.round(Date.now()/ 1000) - 60*60;
		var app_id = req.query.app_id;
		summary.activeFromTime(current, app_id, function(err, result){
			return res.send(result);
		});
	}

	info.install_os = function(req, res){
		var date = new Date(req.query.date).addDays(-1);
		var app_id = req.query.app_id;
		summary.installFromDateByOS(date, app_id, function(err, result){
			return res.send(result);
		});
	}

	return info;
}