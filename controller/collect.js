/**
 * Created by hoangnn on 4/8/14.
 */
var validator = require("validator");
var ActiveModel = require("../models/ActiveModel");
var _ = require("underscore");
var analytics = require("../tool/analytics");
var constant = require("../config/constant");

function log_validate(log) {

	// validate app_id is exist
	if (!_.isString(log.app_id))
	{
		return false;
	}

	// validate uuid is exist
	if (!_.isString(log.uuid))
	{
		return false;
	}

	// validate log type

	if(!_.isNumber(log.type))
	{
		return false;
	}
	// validate app key is valid

	// other validate

	// validate log type

	return true;
}

function paid_log_validate(log)
{
	if(!_.isNumber(log.paid_value))
	{
		return false;
	}

	if(!_.isString(log.coin_unit))
	{
		return false;
	}

	return true;
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}


module.exports = function (app) {

	var collect = {}

	collect.collect = function (req, res) {
		res.send("Ok");
		console.log(req.body);
		if(typeof (req.body) == 'object' && typeof(req.body[0]) !== 'undefined' && (req.body[0]).length === 3)
		{
			data = req.body[0][2];
			collect.analytics(data);
			return true;
		}else{
			console.log("Please send an array: " + typeof (req.body));
			return false;
		}
	}

	collect.collect_old = function (req, res) {
		res.send("Ok");
		console.log(req.body[0]);
	}


	collect.analytics = function (log) {

		Object.keys(log).forEach(function (key) {
			console.log("Value for " + key + " is : " + log[key]);
		});

		if(log_validate(log))
		{
			console.log("Valid log");

			if(log.type === constant.LOG_REGISTER )
			{
				analytics.install(log, function(err, res){
					console.log(res);
				});
			}

			if(log.type === constant.LOG_LOGIN )
			{
				analytics.login(log, function(err, res){
					console.log(res);
				});
			}

			if(log.type === constant.LOG_ACTIVE_START )
			{
				analytics.active(log, function(err, res){
					console.log(res);
				});
			}

			if(log.type === constant.LOG_ACTIVE_END )
			{
				analytics.inactive(log, function(err, res){
					console.log(res);
				});
			}

			if(log.type === constant.LOG_PAYMENT )
			{
				if(paid_log_validate(log)){
					console.log("Valid payment");
					analytics.paid(log, function(err, res){
						//console.log(res);
					});
				}else
				{
					console.log("invalid payment");
					return false;
				}

			}

		}else{
			console.log("not valid log");
			return false;
		}
	}

	/*
	collect.testdb = function (req, res) {
		console.time("INSERT");
		for (var i = 0; i < 10000; i++)
		{
			uuid = "uuid" + randomInt(0, 600);
			ActiveModel.activeUser(uuid, "loggee", function(err, result){
				console.log(result);
			});
		}
		console.timeEnd("INSERT");
		return res.send("ok");
	}

	collect.active = function(req, res)
	{
		ActiveModel.getDailyActiveUserByDate(Date.today().addDays(1), function(err, result){

		});

		return res.send("ok");
	}
	*/

	return collect;
}