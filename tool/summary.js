/**
 * Created by hoangnn on 4/11/14.
 */
var DailyActiveModel = require("../models/DailyActiveModel");
var AppInfoModel = require("../models/AppInfoModel");
var PaidModel = require("../models/PaidModel");
var ActiveModel = require("../models/ActiveModel");
var util = require("util");

var summary = module.exports;

/**
 * Get dau of system for each date from @date
 * @param date
 * @param app_id
 * @param callback
 * @return array
 */
summary.dauFromDate = function (date, app_id, callback) {
	DailyActiveModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$time', count: {$sum: 1}}},
			{$sort: {_id: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("DAU err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("DAU res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.dauFromDateByOS = function (date, app_id, callback) {
	DailyActiveModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os', count: {$sum: 1}}},
			{$sort:  {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("DAU err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("DAU res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.dauFromDateByGame = function (date, app_id, callback) {
	DailyActiveModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$app_version', count: {$sum: 1}}},
			{$sort:  {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("DAU err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("DAU res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.dauFromDateByLanguage = function (date, app_id, callback) {
	DailyActiveModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_language', count: {$sum: 1}}},
			{$sort:  {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("DAU err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("DAU res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.dauFromDateByDevice = function (date, app_id, callback) {
	DailyActiveModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_name', count: {$sum: 1}}},
			{$sort:  {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("DAU err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("DAU res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

/**
 * Get install number of system for each date from @date
 * @param date
 * @param app_id
 * @param callback
 * @return array
 */
summary.installFromDate = function (date, app_id, callback) {
	AppInfoModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$time', count: {$sum: 1}}},
			{$sort:  {_id: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("INSTALL err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("INSTALL res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.installFromDateByOS = function(date, app_id, callback){
	AppInfoModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os', count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("INSTALL err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("INSTALL res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.installFromDateByGame = function(date, app_id, callback){
	AppInfoModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$app_version', count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("INSTALL err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("INSTALL res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.installFromDateByLanguage = function(date, app_id, callback){
	AppInfoModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_language', count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("INSTALL err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("INSTALL res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.installFromDateByDevice = function(date, app_id, callback){
	AppInfoModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_name', count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("INSTALL err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("INSTALL res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

/**
 * get app revenue for each day from date
 * @param date
 * @param app_id
 * @param callback
 */
summary.revenueFromDate = function (date, app_id, callback) {
	PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$time', paid_value: {$sum: '$paid_converted'}, paid: {$sum: 1}}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("REVENUE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("REVENUE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.revenueFromDateByOS = function (date, app_id, callback) {
	PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os', paid_value: {$sum: '$paid_converted'}, paid: {$sum: 1}}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("REVENUE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("REVENUE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.revenueFromDateByGame = function (date, app_id, callback) {
	PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$app_version', paid_value: {$sum: '$paid_converted'}, paid: {$sum: 1}}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("REVENUE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("REVENUE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.revenueFromDateByLanguage = function (date, app_id, callback) {
	PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_language', paid_value: {$sum: '$paid_converted'}, paid: {$sum: 1}}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("REVENUE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("REVENUE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.revenueFromDateByDevice = function (date, app_id, callback) {
	PaidModel.aggregate([
			{$match: {time: {$gte: date}, app_id: app_id}},
			{$group: {_id: '$os_name', paid_value: {$sum: '$paid_converted'}, paid: {$sum: 1}}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("REVENUE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("REVENUE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.activeFromTime = function (time, app_id, callback) {
	ActiveModel.aggregate([
			{$match: {start_time: {$gte: time}, end_time: {$ne: null}, app_id: app_id}},
			{$group: {_id: {time: '$start_time'}, count: {$sum: 1}}},
			{$sort: {_id: 1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("ACTIVE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("ACTIVE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.activeFromTimeByOS = function (time, app_id, callback) {
	ActiveModel.aggregate([
			{$match: {start_time: {$gte: time}, end_time: {$ne: null}, app_id: app_id}},
			{$group: {_id: {time: '$os'}, count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("ACTIVE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("ACTIVE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.activeFromTimeByGame = function (time, app_id, callback) {
	ActiveModel.aggregate([
			{$match: {start_time: {$gte: time}, end_time: {$ne: null}, app_id: app_id}},
			{$group: {_id: {time: '$app_version'}, count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("ACTIVE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("ACTIVE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.activeFromTimeByLanguage = function (time, app_id, callback) {
	ActiveModel.aggregate([
			{$match: {start_time: {$gte: time}, end_time: {$ne: null}, app_id: app_id}},
			{$group: {_id: {time: '$os_language'}, count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("ACTIVE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("ACTIVE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}

summary.activeFromTimeByDevice = function (time, app_id, callback) {
	ActiveModel.aggregate([
			{$match: {start_time: {$gte: time}, end_time: {$ne: null}, app_id: app_id}},
			{$group: {_id: {time: '$os_name'}, count: {$sum: 1}}},
			{$sort: {count: -1}}
		]).exec(function (err, res) {
		if (err)
		{
			console.log("ACTIVE err: " + util.inspect(err));
			return callback(err, null);
		} else
		{
			console.log("ACTIVE res: " + util.inspect(res));
			return callback(null, res);
		}
	});
}