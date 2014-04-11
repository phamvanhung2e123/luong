var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://localhost/log');
var logSchema = mongoose.Schema({
	sp_id: String, // smart phone id to seperate ios, andorid
	log_id: String, // Log id
	uuid: {type: String, index: true}, // device id username
	last_login_date: Date, // Last time user login date
	register_date: Date, // Register date
	first_paid_date: Date,
	tutorial_flag: String, // current tutorial step
	now_game_area: String, // curent area
	now_game_stage: String, // current state in area
	energy_having: String,
	gem_having: String,
	energy_using: String, // each time useing enegy
	gem_using: String, //
	payment: String, // how much user pay for each time paid
	get_warriors_id: String, // gacha result
	battle_result: String, // win or lose
	warriors_number: String, // how many warriors
	device_time: Date, // Current device time
	create_date: Date, // Current time server
	device_os: String, // language
	device_name: String, // device type
	miss: String, // scout type
	hatena: String //
}, {
    capped: 102400 * 1024
});

var LogModel = db.model("LogModel", logSchema);

module.exports = LogModel;