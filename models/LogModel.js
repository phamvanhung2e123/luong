var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');
var logSchema = mongoose.Schema({
	sp_id: Number, // smart phone id to seperate ios, andorid
	log_id: Number, // Log id
	uuid: {type: String, index: true}, // device id username
	last_login_date: Date, // Last time user login date
	register_date: Date, // Register date
	first_paid_date: Date,
	tutorial_flag: Number, // current tutorial step
	now_game_area: Number, // curent area
	now_game_stage: Number, // current state in area
	energy_having: Number,
	gem_having: Number,
	energy_using: Number, // each time useing enegy
	gem_using: Number, //
	payment: Number, // how much user pay for each time paid
	get_warriors_id: Number, // gacha result
	battle_result: Number, // win or lose
	warriors_number: Number, // how many warriors
	device_time: Date, // Current device time
	create_date: Date, // Current time server
	device_os: String, // language
	device_name: String, // device type
	miss: String, // scout type
	hatena: Number //
});

var LogModel = db.model("LogModel", logSchema);

module.exports = LogModel;