/**
 * Created by hoangnn on 2/27/14.
 */
var LogModel = require("../models/LogModel");
var validator = require("validator");

function parse(line)
{
	var maps = line.split(",");
	var Log = new LogModel();

	if(validator.isNumeric(maps[0]))
	{
		Log.sp_id = maps[0];
	}

	if(validator.isNumeric(maps[1]))
	{
		Log.log_id = maps[1];
	}

	if(validator.isAlphanumeric(maps[2]))
	{
		Log.uuid = maps[2];
	}

	if(validator.isDate(maps[3]))
	{
		Log.last_login_date = maps[3];
	}

	if(validator.isDate(maps[4]))
	{
		Log.register_date = maps[4];
	}

	if(validator.isDate(maps[5]))
	{
		Log.first_paid_date = maps[5];
	}
	if(validator.isNumeric(maps[6]))
	{
		Log.tutorial_flag = maps[6];
	}

	if(validator.isNumeric(maps[7]))
	{
		Log.now_game_area = maps[7];
	}

	if(validator.isNumeric(maps[8]))
	{
		Log.now_game_stage = maps[8];
	}

	if(validator.isNumeric(maps[9]))
	{
		Log.energy_having = maps[9];
	}

	if(validator.isNumeric(maps[10]))
	{
		Log.gem_having = maps[10];
	}

	if(validator.isNumeric(maps[11]))
	{
		Log.energy_using = maps[11];
	}

	if(validator.isNumeric(maps[12]))
	{
		Log.gem_using = maps[12];
	}

	if(validator.isNumeric(maps[13]))
	{
		Log.payment = maps[13];
	}

	if(validator.isNumeric(maps[14]))
	{
		Log.get_warriors_id = maps[14];
	}

	if(validator.isNumeric(maps[15]))
	{
		Log.battle_result = maps[15];
	}

	if(validator.isNumeric(maps[16]))
	{
		Log.warriors_number = maps[16];
	}

	if(validator.isDate(maps[17]))
	{
		Log.device_time = maps[17];
	}

	if(validator.isDate(maps[18]))
	{
		Log.create_date = maps[18];
	}

	if(validator.isAlphanumeric(maps[19]))
	{
		Log.device_os = maps[19];
	}

	if(validator.isAlphanumeric(maps[20]))
	{
		Log.device_name = maps[20];
	}

	return Log;
}

module.exports.parse = parse;